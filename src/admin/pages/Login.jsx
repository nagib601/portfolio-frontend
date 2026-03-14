import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Environment Variable থেকে API URL নেওয়া হচ্ছে
  const API_URL = import.meta.env.VITE_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setIsLoggingIn(true);

    try {
      // API_URL এর শেষে /admin/login এ রিকোয়েস্ট যাচ্ছে
      const res = await fetch(`${API_URL}/admin/login`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json" 
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("isAdmin", "true");
        // লগইন সফল হলে ড্যাশবোর্ডে রিডাইরেক্ট
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          timer: 1500,
          showConfirmButton: false
        });
        navigate("/admin/dashboard", { replace: true });
      } else {
        Swal.fire("Error", data.message || "ইমেইল বা পাসওয়ার্ড ভুল।", "error");
      }
    } catch (error) {
      console.error("Login Error:", error);
      Swal.fire("Error", "সার্ভারে কানেক্ট করা যাচ্ছে না। আপনার .env ফাইলের URL এবং ব্যাকএন্ড চেক করুন।", "error");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-base-200 font-sans cursor-default">
      <div className="bg-base-100 shadow-2xl rounded-2xl overflow-hidden flex max-w-4xl w-full m-4">

        {/* Left Panel - Illustration */}
        <div className="hidden md:flex w-1/2 bg-primary items-center justify-center p-10 text-white flex-col">
          <img
            src="https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7962.jpg"
            alt="Login Illustration"
            className="w-full h-auto mb-4 rounded-lg mix-blend-multiply"
          />
          <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
          <p className="text-center text-white/90">
            Manage your portfolio and track your visitors.
          </p>
        </div>

        {/* Right Panel - Login Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-base-content">Admin Login</h2>
            <p className="text-base-content/70 mt-2">Please sign in to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">

            {/* Email Address */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-base-content">Email Address</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-base-100"
                required
              />
            </div>

            {/* Password */}
            <div className="form-control relative">
              <label className="label">
                <span className="label-text font-semibold text-base-content">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="input input-bordered w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-base-100"
                required
              />
              <span
                className="absolute top-[38px] right-4 cursor-pointer text-base-content/60 hover:text-primary transition"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </span>
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button
                disabled={isLoggingIn}
                className="btn btn-primary w-full text-white text-lg font-bold shadow-md hover:shadow-lg transition-all"
              >
                {isLoggingIn ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    LOGGING IN...
                  </>
                ) : (
                  "LOGIN"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;