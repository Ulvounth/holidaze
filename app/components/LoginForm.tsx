"use client";

const LoginForm: React.FC = () => {
  return (
    <form className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" id="email" className="mt-1 p-2 w-full border rounded" placeholder="email" />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input type="password" id="password" className="mt-1 p-2 w-full border rounded" placeholder="password" />
      </div>
      <button type="submit" className="w-full p-2 bg-pink-500 text-white rounded">Login</button>
      <p className="text-sm text-center">Don’t have an account? <a href="#" className="text-pink-500">Register</a></p>
    </form>
  );
};

export default LoginForm;

  