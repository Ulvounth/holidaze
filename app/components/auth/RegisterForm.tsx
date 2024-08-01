"use client";

import { FC, useState } from "react";
import InputField from "../ui/InputField";

const RegisterForm: FC = () => {
  const [isVenueManager, setIsVenueManager] = useState(false);

  return (
    <form className="space-y-4">
      <InputField id="name" label="Name" type="text" placeholder="name" />
      <InputField id="email" label="Email" type="email" placeholder="email" />
      <InputField
        id="password"
        label="Password"
        type="password"
        placeholder="password"
      />
      <div>
        <label htmlFor="venueManager" className="inline-flex items-center">
          <input
            type="checkbox"
            id="venueManager"
            className="form-checkbox"
            checked={isVenueManager}
            onChange={(e) => setIsVenueManager(e.target.checked)}
          />
          <span className="ml-2 text-sm text-gray-700">
            I’m a venue manager
          </span>
        </label>
      </div>
      <button
        type="submit"
        className="w-full p-2 bg-pink-500 text-white rounded"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
