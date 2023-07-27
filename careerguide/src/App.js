import { Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./component/Register";
import Login from "./component/Login";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
