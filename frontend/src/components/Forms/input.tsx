import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from "react";

export type InputSize = "medium" | "large";
export type InputType = "password" | "email" | "text";

export type InputProps = {
  id: string;
  name: string;
  type?: InputType;
  size?: InputSize;
  className?: string;
} & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "size">;

export const Input: any = forwardRef<HTMLInputElement, InputProps>(
  ({ id, name, type = "text", size = "medium", className, placeholder, ...props }, ref) => {
    return (
      <input id={id} ref={ref} name={name} type={type} placeholder={placeholder} className={className} {...props} />
    );
  }
);
