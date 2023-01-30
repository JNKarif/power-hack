import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const [loginError, setLoginError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleLogin = (data) => {
    console.log(data);
    setLoginError("");
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.error(err.message);
        setLoginError(err.message);
      });
  };

  return (
    <div className="h-[500px]  flex justify-center items-center">
      <div className="p-7">
        <h2 className="text-3xl text-center">Login</h2>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              {...register("name")}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.name?.type === "required" && (
              <p role="alert">Name is required</p>
            )}

            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              className="input input-bordered w-full max-w-xs"
            />
            {errors.email && <p role="alert">{errors.email?.message}</p>}
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be 8 character or longer",
                },
              })}
              type="password"
              className="input input-bordered w-full max-w-xs"
            />
            {errors.password && <p role="alert">{errors.password?.message}</p>}
          </div>

          <input type="submit" value="Login" className="btn my-4 w-full" />
          <div>
            {loginError && <p className="text-red-700">{loginError}</p>}
          </div>
        </form>
        <p>
          New to Power Hack? {""}
          {""}
          <Link to="/signup" className="text-secondary">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
