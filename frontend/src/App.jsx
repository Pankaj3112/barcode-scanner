import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Scanner, History, Product, Navigation } from "./components";

function App() {
  return (
    <div className="border border-black mx-auto h-[100vh] w-[100vw] max-w-sm max-h-[800px] relative">
      <Router>
        <Routes>
          <Route path="/" element={<Scanner />} />
          <Route path="/history" element={<History />} />
          <Route path="/product/:barcode" element={<Product />} />
        </Routes>
        <Navigation />
      </Router>
    </div>
  );
}

export default App;
