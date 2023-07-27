import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "650px",
        width: "100%",
      }}
    >
      if not have a account then
      <Link to="/register">Please Register</Link>
    </div>
  );
}

export default Home;
