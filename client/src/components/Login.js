import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";

const Login = () => {

  const initialUserValues = {
    username: "",
    password: "",
  }

  const [userValues, setUserValues] = useState(initialUserValues);
  const history = useHistory();
  const { push } = history;

  const handleChanges = evt => {
    const { name, value } = evt.target;
    setUserValues({ ...userValues, [name]: value });
  }

  const onSubmit = evt => {
    evt.preventDefault();
    axiosWithAuth()
      .post("/api/login", userValues)
      .then(res => {
        // console.log(res)
        window.localStorage.setItem("token", res.data.payload);
        push("/bubbles")
      })
      .catch(err => console.log(err))
  }

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <form onSubmit={onSubmit}>
      <label>Username:
            <input type="text" value={userValues.username} name="username" onChange={handleChanges}></input>
      </label>
      <br></br>
      <label>Password:
            <input type="password" value={userValues.password} name="password" onChange={handleChanges}></input>
      </label>
      <br></br>
      <button>Sign In</button>
    </form>
  )
}

export default Login;
