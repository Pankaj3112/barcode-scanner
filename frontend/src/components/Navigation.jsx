import { Link, useLocation } from "react-router-dom";
import { Camera, List } from "lucide-react";

const Navigation = () => {
  const { pathname } = useLocation();
  const scanColor =
    pathname === "/" ? "text-blue-500": "text-gray-500";
  const historyColor =
    pathname === "/history" ? "text-blue-500": "text-gray-500";

  return (
    <div className="fixed bottom-0 w-full max-w-sm text-center p-2 border-t border-t-gray-400 bg-gray-50 flex justify-around ">
      <Link to="/">
        <div className={"flex flex-col items-center text-sm " + scanColor}>
          <Camera />
          <p>Scan</p>
        </div>
      </Link>
      <Link to="/history">
        <div className={"flex flex-col items-center text-sm " + historyColor}>
          <List />
          <p>History</p>
        </div>
      </Link>
    </div>
  );
};

export default Navigation;
