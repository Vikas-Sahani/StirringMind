import { useState } from "react";
// import "./App.css";
import google from "../assets/g.svg";
import { Link } from "react-router-dom";

function Register() {
  const [inpval, setINP] = useState({
    email: "",
    name: "",
    password: "",
    education: "",
    city: "",
    mobile: "",
  });

  const setdata = (e) => {
    console.log(e.target.value);
    console.log(inpval);

    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const addinpdata = async (e) => {
    e.preventDefault();

    const { email, name, password, education, city, mobile } = inpval;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        password,
        education,
        city,
        mobile,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
      alert("error");
    } else {
      console.log("data added in register page");
    }
  };

  return (
    <div className="App">
      <form method="POST">
        <h2>Create An Account</h2>
        <button className="googleReg">
          <div>
            <img src={google} alt="google" />
          </div>
          <p>Google</p>
        </button>
        <input
          type="email"
          name="email"
          onChange={setdata}
          placeholder="Email"
        />
        <input
          type="text"
          name="name"
          onChange={setdata}
          placeholder="Full Name"
        />
        <input
          type="password"
          name="password"
          onChange={setdata}
          placeholder="Password"
        />
        <select name="education" onChange={setdata}>
          <option>-----Highest Education Level-----</option>
          <option>6th - 9th Class</option>
          <option>10th Class</option>
          <option>11th Class</option>
          <option>12th Class</option>
          <option>Graduate Degree / Diploma</option>
          <option>postgraduate Degree</option>
          <option>Working Professional</option>
        </select>
        <select name="city" onChange={setdata}>
          <option>-----Select your City-----</option>
          <option>Adilabad</option>
          <option>agra</option>
          <option>Aligarh</option>
          <option>Ajmer</option>
          <option>Chennai</option>
          <option>Delhi</option>
          <option>Mumbai</option>
        </select>
        <input type="text" value="India (+91)" />
        <input
          type="text"
          name="mobile"
          onChange={setdata}
          placeholder="Mobile Numbers"
        />
        <button
          onClick={addinpdata}
          style={{
            backgroundColor: "skyblue",
            color: "white",
            // marginBottom: "10%",
            height: "10%",
          }}
        >
          Submit
        </button>

        <Link
          to="/login"
          style={{ margin: "5% 0%", textDecoration: "none", color: "black" }}
        >
          Back To Login
        </Link>
      </form>
    </div>
  );
}

export default Register;
