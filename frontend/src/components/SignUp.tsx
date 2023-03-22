import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card } from "react-bootstrap";
import { FormInput } from "./form/form-input";

export type RegisterFormProps = {
  email: string;
  password: string;
  confirmPassword: string;
};

const validateInputSchema = z
  .object({
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(8, "Enter a minimum of 8 characters").max(256, "Consider using a short password"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password does not match",
  });

type validationSchema = z.infer<typeof validateInputSchema>;

export const AuthForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<validationSchema>({ resolver: zodResolver(validateInputSchema) });

  const onSubmit: SubmitHandler<validationSchema> = (data) => console.log(data);
  return (
    <Card>
      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormInput<RegisterFormProps>
            id="email"
            name="email"
            placeholder="email"
            register={register}
            errors={errors}
          />
          <FormInput<RegisterFormProps>
            id="password"
            name="password"
            type="password"
            placeholder="password"
            register={register}
            errors={errors}
          />
          <FormInput<RegisterFormProps>
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="confirm password"
            register={register}
            errors={errors}
          />
          <Button className="w-100" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};
