
import React, { useState } from "react";
import {useNavigate } from "react-router-dom";
import { BiUser, BiLock } from "react-icons/bi";
import { toast } from "react-toastify";
import axios from "axios";
import Loading from "./Loading";



const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [Load, setLoad] = useState(false)
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    setLoad(true)
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", credentials.username);
    formData.append("password", credentials.password);

    try {
      const response = await axios.post(
        "https://teraheartz.000webhostapp.com/hospital_management/admin_login.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      if (response.data.status === "true") {
        toast.success(response.data.message);
        const role=response.data.admin_role;
        localStorage.setItem("role",role);
        navigate('/dashboard', { replace: true });
        setLoad(false)
      }
      else
      {
        toast.error(response.data.message)
        setLoad(false)
      }
    } catch (error) {
      console.error("invalid request",error);
    }
  };

  return (
    <>
     <div className="h-screen flex justify-center items-center">
  <div className="shadow-xl w-96 rounded-md p-6 bg-white">
    <div className="text-center bg-cyan-950 px-4 py-2 text-white rounded-t-md">
      <h2 className="font-serif text-xl">ADMIN LOGIN</h2>
    </div>
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
      <div className="flex items-center gap-4">
        <div className="bg-slate-200 p-2 rounded-md">
          <BiUser className="text-[20px] text-gray-600" />
        </div>
        <input
          className="w-full py-2 px-3 bg-slate-200 rounded-md  font-serif focus:outline-none"
          type="text"
          placeholder="ENTER A USERNAME"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="bg-slate-200 p-2 rounded-md">
          <BiLock className="text-[20px] text-gray-600" />
        </div>
        <input
          className="w-full py-2 px-3 bg-slate-200 rounded-md font-serif focus:outline-none"
          placeholder="ENTER A PASSWORD"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
      </div>
      {Load?(<>
      <Loading/>
      </>):(<><input 
  type="submit"
  value="LOGIN"
  className={`bg-sky-950 hover:bg-sky-900 px-4 py-2 text-white rounded-md font-serif ${
    credentials.username.length === 0 || credentials.password.length === 0
      ? 'opacity-50 cursor-not-allowed'
      : 'opacity-100 cursor-pointer'
  }`}
  disabled={credentials.username.length === 0 || credentials.password.length === 0}
/></>)}
    </form>
  </div>
</div>
    </>
  );
};

export default Login;
