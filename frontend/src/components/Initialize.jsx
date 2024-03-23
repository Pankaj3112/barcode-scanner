import { useState, useRef, useEffect } from "react";
import Quagga from "@ericblade/quagga2";
import QuaggaInit from "./QuaggaInit";

const Initialize = ({ setResult, sizeConstraints }) => {
  const [scanning, setScanning] = useState(false); // toggleable state for "should render scanner"
  const [cameras, setCameras] = useState([]); // array of available cameras, as returned by Quagga.CameraAccess.enumerateVideoDevices()
  const [cameraId, setCameraId] = useState(null); // id of the active camera device
  const [cameraError, setCameraError] = useState(null); // error message from failing to access the camera
  const scannerRef = useRef(null); // reference to the scanner element in the DOM

  // at start, we need to get a list of the available cameras.  We can do that with Quagga.CameraAccess.enumerateVideoDevices.
  // HOWEVER, Android will not allow enumeration to occur unless the user has granted camera permissions to the app/page.
  // AS WELL, Android will not ask for permission until you actually try to USE the camera, just enumerating the devices is not enough to trigger the permission prompt.
  // THEREFORE, if we're going to be running in Android, we need to first call Quagga.CameraAccess.request() to trigger the permission prompt.
  // AND THEN, we need to call Quagga.CameraAccess.release() to release the camera so that it can be used by the scanner.
  // AND FINALLY, we can call Quagga.CameraAccess.enumerateVideoDevices() to get the list of cameras.

  // Normally, I would place this in an application level "initialization" event, but for this demo, I'm just going to put it in a useEffect() hook in the App component.

  useEffect(() => {
    const enableCamera = async () => {
      await Quagga.CameraAccess.request(null, {});
    };
    const disableCamera = async () => {
      await Quagga.CameraAccess.release();
    };
    const enumerateCameras = async () => {
      const cameras = await Quagga.CameraAccess.enumerateVideoDevices();
      console.log("Cameras Detected: ", cameras);
      return cameras;
    };
    enableCamera()
      .then(disableCamera)
      .then(enumerateCameras)
      .then((cameras) => setCameras(cameras))
      .then(() => Quagga.CameraAccess.disableTorch()) // disable torch at start, in case it was enabled before and we hot-reloaded
      .catch((err) => setCameraError(err));
    return () => disableCamera();
  }, []);

  console.log(sizeConstraints);

  return (
    <div className="flex flex-col items-center p-5 h-full">
      <div
        ref={scannerRef}
        className={`relative inset-0 flex flex-col justify-center items-center w-[${sizeConstraints.width}px] h-[${sizeConstraints.height}px] border-2 border-dashed  border-gray-500 p-1 rounded-md`}
      >
        
        <canvas className="drawingBuffer w-full h-full rounded-md absolute" ></canvas>
        {scanning && (
          <QuaggaInit
            constraints={sizeConstraints}
            scannerRef={scannerRef}
            cameraId={cameraId}
            onDetected={(result) => {
              console.log(result);
              setResult(result);
            }}
          />
        )}
      </div>

      <div className="flex flex-col items-center justify-between">
        <div className="">
          {cameraError && (
            <p className=" text-red-500 text-sm mt-2 text-center">
              Error initializing camera.
            </p>
          )}

          {cameras.length === 0 && (
            <p className="text-red-500 text-sm my-2 text-center">
              Browser may be prompting for permissions beforehand.
            </p>
          )}
        </div>

        <div className="flex flex-col items-center justify-center gap-4  absolute bottom-20">
          {cameras.length !== 0 && (
            <form className="">
              <select
                className="p-2 bg-gray-100 rounded-md w-fit"
                onChange={(event) => setCameraId(event.target.value)}
              >
                {cameras.map((camera) => (
                  <option key={camera.deviceId} value={camera.deviceId}>
                    {camera.label || camera.deviceId}
                  </option>
                ))}
              </select>
            </form>
          )}

          <button
            onClick={() => {
              setScanning(!scanning);
              const video = scannerRef.current.querySelector("video");
              if (video) {
                video.remove();
              }
            }}
            className="p-2 bg-black text-white rounded-md w-44"
          >
            {scanning ? "Stop" : "Scan"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Initialize;
