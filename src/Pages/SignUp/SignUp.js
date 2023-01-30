import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";

const SignUp = () => {
  // const [signUpError, setSignUpError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser } = useContext(AuthContext);

  const handleSignUp = (data) => {
    console.log(data);
    // setSignUpError("");
    createUser(data.email, data.password).then((result) => {
      const user = result.user;
      console.log(user);
    });
  };

  return (
    <div className="h-[500px]  flex justify-center items-center">
      <div className="p-7">
        <h2 className="text-3xl text-center">SingUp</h2>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              {...register("name", { required: true })}
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

          <input type="submit" value="signup" className="btn my-4 w-full" />
        </form>
        <p>
          Already have an account? {""}
          {""}
          <Link to="/login" className="text-secondary">
            Please Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
