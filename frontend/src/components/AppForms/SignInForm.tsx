import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { FormInput } from "../Forms/form-input";

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

  const onSubmit: SubmitHandler<validationSchema> = (data) => console.log(data);
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
          <Button className="w-100" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};
