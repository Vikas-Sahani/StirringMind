import { Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./component/Register";
import Login from "./component/Login";
import Home from "./component/Home";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
