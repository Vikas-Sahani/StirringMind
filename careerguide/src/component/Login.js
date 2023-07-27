import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  console.log(user);

  let inpName, inpValue;

  const handleInputs = (e) => {
    inpName = e.target.name;
    inpValue = e.target.value;

    setUser({ ...user, [inpName]: inpValue });
  };

  const PostData = async (e) => {
    e.preventDefault();
    const { email, password } = user;
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.status === 400 || !data) {
      console.log("error ");
      alert("error");
    } else {
      window.alert(" Login successful");
      console.log("Login successful", res.status);
      navigate("/");
    }
  };
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
      <div style={{ width: "30%" }}>
        <h1>Sign In!</h1>
        <form method="POST">
          <input
            type="email"
            name="email"
            onChange={handleInputs}
            placeholder="Your Email"
          />
          <input
            type="password"
            name="password"
            onChange={handleInputs}
            placeholder="Password"
          />
          <button onClick={PostData}>Log In</button>
          <Link>Forgot Your Password?</Link>
          <div>
            Don't Have An Account Yet ?
            <button style={{ height: "50%" }}>SIGN UP !</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
