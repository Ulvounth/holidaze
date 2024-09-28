import AuthForm from "@/app/lib/AuthForm";
import { loginSchema } from "@/app/lib/schemas/authSchemas";

const LoginForm = ({
  onClose,
  onLoginSuccess,
}: {
  onClose: () => void;
  onLoginSuccess: (
    user: { name: string; email: string; avatarUrl?: string },
    token: string
  ) => void;
}) => {
  return (
    <AuthForm
      schema={loginSchema}
      endpoint="/api/auth/login"
      onSuccess={(data) => {
        const user = {
          name: data.data.name,
          email: data.data.email,
          avatarUrl: data.data.avatar?.url,
          venueManager: data.data.venueManager,
        };
        const token = data.data.accessToken;
        onLoginSuccess(user, token);
      }}
      onClose={onClose}
      formFields={[
        {
          id: "email",
          label: "Email",
          type: "email",
          placeholder: "email@stud.noroff.no",
          name: "email",
        },
        {
          id: "password",
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
          name: "password",
        },
      ]}
      buttonText="Log In"
    />
  );
};

export default LoginForm;
