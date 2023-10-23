import { useState } from "react";
import { useCookies } from "react-cookie";

const Auth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [error, setError] = useState(null);
  const [isLogIn, setIsLogin] = useState(true);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const viewLogin = (status) => {
    setError(null);
    setIsLogin(status);
  };
  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if (!isLogIn && password !== confirmPassword) {
      setError("Make sure passwords match!");
      return;
    }
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (data.detail) {
      setError(data.detail);
    } else {
      setCookie("Email", data.email);
      setCookie("AuthToken", data.token);
      window.location.reload();
    }
  };
  return (
    <div className=" flex justify-center m-12">
      <div className=" w-[31rem] rounded-xl shadow-xl">
        <form className=" flex flex-col h-[100%] p-5">
          <h2 className="text-2xl font-bold">
            {isLogIn ? "Please log in" : "Please sign up"}
          </h2>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            className=" bg-slate-300 rounded-xl p-3 mt-6 border-slate-400 border"
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            className=" bg-slate-300 rounded-xl p-3 mt-6 border-slate-400 border"
          />
          {!isLogIn && (
            <input
              type="password"
              placeholder="confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className=" bg-slate-300 rounded-xl p-3 mt-6 border-slate-400 border"
            />
          )}
          <input
            type="submit"
            className=" bg-gray-300 rounded-xl p-3 mt-6 border-slate-600 border"
            onClick={(e) => handleSubmit(e, isLogIn ? "login" : "signup")}
          />
          {error && <p>{error}</p>}
        </form>
        <div className=" flex">
          <button
            onClick={() => viewLogin(false)}
            className={`w-1/2 p-3 rounded-tl-xl rounded-bl-xl text-[#23262f] ${
              !isLogIn ? "bg-white" : "bg-slate-400"
            }`}
          >
            Sign Up
          </button>
          <button
            onClick={() => viewLogin(true)}
            className={`w-1/2 p-3 text-[#23262f] rounded-tr-xl rounded-br-xl ${
              isLogIn ? "bg-white" : "bg-slate-400"
            }`}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
