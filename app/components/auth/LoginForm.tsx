"use client";

import { FC } from "react";
import InputField from "../ui/InputField";

const LoginForm: FC = () => {
  return (
    <form className="space-y-4">
      <InputField id="email" label="Email" type="email" placeholder="email" />
      <InputField
        id="password"
        label="Password"
        type="password"
        placeholder="password"
      />
      <button
        type="submit"
        className="w-full p-2 bg-pink-500 text-white rounded"
      >
        Login
      </button>
      <p className="text-sm text-center">
        Don’t have an account?{" "}
        <a href="#" className="text-pink-500">
          Register
        </a>
      </p>
    </form>
  );
};

export default LoginForm;
