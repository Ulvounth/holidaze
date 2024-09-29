import AuthForm from "@/app/lib/AuthForm";
import { registerSchema } from "@/app/lib/schemas/authSchemas";

const RegisterForm = ({ onClose }: { onClose: () => void }) => {
  return (
    <AuthForm
      schema={registerSchema}
      endpoint="/api/auth/register"
      onSuccess={() => {}}
      onClose={onClose}
      formFields={[
        {
          id: "name",
          label: "Name",
          type: "text",
          placeholder: "Your Name",
          name: "name",
        },
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
        {
          id: "venueManager",
          label: "Register as venue manager",
          type: "checkbox",
          placeholder: "",
          name: "venueManager",
        },
      ]}
      buttonText="Register"
    />
  );
};

export default RegisterForm;
