import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card } from "react-bootstrap";
import { CSSProperties } from "react";

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
  const errorStyle: CSSProperties = {
    color: "red",
  };
  return (
    <Card>
      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control {...register("email")} placeholder="Enter email" />
            <small style={errorStyle}>{errors.email?.message}</small>
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" {...register("password")} />
            <small style={errorStyle}>{errors.password?.message}</small>
          </Form.Group>

          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="confirmPassword" {...register("confirmPassword")} />
            <small style={errorStyle}>{errors.confirmPassword?.message}</small>
          </Form.Group>
          <Button className="w-100" style={{ float: "right" }} variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};
