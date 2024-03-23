import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Initialize from "./Initialize";

const Scanner = () => {
  const [barcode, setBarcode] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
	if (barcode) {
	  navigate(`/product/${barcode}`);
	}

  }, [barcode, navigate]);

  return (
    <div className="h-[90%]">
      <Initialize
        setResult={setBarcode}
        sizeConstraints={{
          width: 640,
          height: 480,
        }}
      />
    </div>
  );
};

export default Scanner;
