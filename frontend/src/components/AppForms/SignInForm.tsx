import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { FormInput } from "../Forms/form-input";
import { TabComponent } from "../Utilities/tab";
import { Link } from "react-router-dom";

export type loginFormProps = {
  email: string;
  password: string;
};

const validateInputSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "InValid Password"),
});

type validationSchema = z.infer<typeof validateInputSchema>;

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<validationSchema>({ resolver: zodResolver(validateInputSchema) });
  const EmailSignUp = () => {
    return (
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormInput<loginFormProps>
              id="email"
              name="email"
              placeholder="Enter email"
              register={register}
              errors={errors}
            />
            <FormInput<loginFormProps>
              id="password"
              name="password"
              placeholder="Enter password"
              register={register}
              errors={errors}
            />
            <Button className="w-100" style={{ backgroundColor: "#407c54", borderColor: "#407c54" }} type="submit">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    );
  };

  const PhoneNumberSignUp = () => {
    return (
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormInput<loginFormProps>
              id="email"
              name="email"
              placeholder="Enter phone number"
              register={register}
              errors={errors}
            />
            <Button className="w-100" style={{ backgroundColor: "#407c54", borderColor: "#407c54" }} type="submit">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    );
  };

  const signUpTab = [
    { title: "Email", children: <EmailSignUp /> },
    { title: "Phone", children: <PhoneNumberSignUp /> },
  ];

  const onSubmit: SubmitHandler<validationSchema> = (data) => console.log(data);
  return (
    <div
      style={{
        border: "0.1px solid #407c54",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div>
        <span>
          <p style={{ fontSize: "12px" }}>Login to your Account</p>
        </span>
      </div>
      <TabComponent tabs={signUpTab}></TabComponent>
      <div style={{ justifyContent: "center", display: "flex", marginTop: "15px" }}>
        <p style={{ fontSize: "12px" }}>
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
};
