import { ErrorMessage } from "@hookform/error-message";
import get from "lodash.get";
import { DeepMap, FieldError, FieldValues, Path, RegisterOptions, UseFormRegister } from "react-hook-form";
import { FormErrorMessage } from "./form-error-message";
import { Input, InputProps } from "./input";

export type FormInputProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
} & Omit<InputProps, "name">;

export const FormInput = <TFormValues extends Record<string, unknown>>({
  name,
  register,
  rules,
  errors,
  className,
  ...props
}: FormInputProps<TFormValues>): JSX.Element => {
  const errorMessage = get(errors, name);
  const hasError = Boolean(errors && errorMessage);
  return (
    <div className="mb-3">
      {/* <label className="form-label">{capitalizeFirstLetter(name)}</label> */}
      <Input
        aria-invalid={hasError}
        name={name}
        className="form-control"
        {...props}
        {...(register && register(name, rules))}
      />
      <ErrorMessage
        errors={errors}
        name={name as any}
        render={({ message }) => <FormErrorMessage>{message}</FormErrorMessage>}
      />
    </div>
  );
};
