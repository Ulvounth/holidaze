"use client";

const RegisterForm: React.FC = () => {
  return (
    <form className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input type="text" id="name" className="mt-1 p-2 w-full border rounded" placeholder="name" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" id="email" className="mt-1 p-2 w-full border rounded" placeholder="email" />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input type="password" id="password" className="mt-1 p-2 w-full border rounded" placeholder="password" />
      </div>
      <div>
        <label htmlFor="venueManager" className="inline-flex items-center">
          <input type="checkbox" id="venueManager" className="form-checkbox" />
          <span className="ml-2 text-sm text-gray-700">I’m a venue manager</span>
        </label>
      </div>
      <button type="submit" className="w-full p-2 bg-pink-500 text-white rounded">Register</button>
    </form>
  );
};

export default RegisterForm;

  