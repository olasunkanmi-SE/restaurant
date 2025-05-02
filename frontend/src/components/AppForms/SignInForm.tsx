import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { FormInput } from "../Forms/form-input";
import { TabComponent } from "../Utilities/tab";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useMutation } from "react-query";
import { ApiResponse } from "../Utilities/ApiResponse";
import { AxiosResponse } from "axios";

type emailLoginFormProps = {
  email: string;
  password: string;
};

const validateEmailInputSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "InValid Password"),
});

type phoneLoginFormProps = {
  phone: string;
};

const validatePhoneInputSchema = z.object({
  phone: z.string(),
});

type validationSchema = z.infer<typeof validateEmailInputSchema>;
type phoneValidationSchema = z.infer<typeof validatePhoneInputSchema>;

const onPhoneNumberSubmit: SubmitHandler<phoneValidationSchema> = (data) => console.log(data);

const PhoneNumberSignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<phoneValidationSchema>({ resolver: zodResolver(validatePhoneInputSchema) });
  return (
    <Card>
      <Card.Body>
        <Form onSubmit={handleSubmit(onPhoneNumberSubmit)}>
          <FormInput<phoneLoginFormProps>
            id="phone"
            name="phone"
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

export const LoginForm = () => {
  const axios = useAxiosPrivate();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<validationSchema> = async (data) => {
    try {
      //Fix this error bubbling issue
      const response: AxiosResponse<any, any> = await axios.post("singleclients/signin", data);
      console.log(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<validationSchema>({ resolver: zodResolver(validateEmailInputSchema) });
  const EmailSignUp = () => {
    return (
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormInput<emailLoginFormProps>
              id="email"
              name="email"
              placeholder="Enter email"
              register={register}
              errors={errors}
            />
            <FormInput<emailLoginFormProps>
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

  const signUpTab = [
    { title: "Email", children: <EmailSignUp /> },
    { title: "Phone", children: <PhoneNumberSignUp /> },
  ];

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
