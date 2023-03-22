export type FormErrorMessageProps = {
  children?: React.ReactNode;
};

const errorStyle = {
  color: "red",
};

export const FormErrorMessage = ({ children }: FormErrorMessageProps) => {
  return <small style={errorStyle}>{children}</small>;
};
