import React, { useState } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Notes from "../Notes";
import { useNavigate } from "react-router-dom";



const Login = () => {
 
  const navigate = useNavigate()

  const [input, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
       await createUserWithEmailAndPassword(auth, input.email, input.password);
      navigate('./notes')

     
    } catch (error) {
      console.error(error);
    }
  }; 

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          name="email"
          value={input.email}
          onChange={handleInput}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-1/2 p-2.5"
          placeholder="john.doe@company.com"
          required
        />

        <input
          type="password"
          id="password"
          name="password"
          value={input.password}
          onChange={handleInput}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-1/2 p-2.5"
          placeholder="•••••••••"
          required
        />

        <button
          type="submit"
          className="w-full mt-5 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Login;
