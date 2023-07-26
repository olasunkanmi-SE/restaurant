import { ChangeEvent, useEffect } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";

type textBox = {
  row: number;
  label: string;
  instructions?: (text: string) => void;
  closeModal: () => void;
  placeholder?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  newValue?: string;
};
type formInputs = {
  text: string;
};

/**
 *Note Component.
 This component is responsible for rendering the menu note modal.
 *
 * @exports
 * @function Note
 *
 */
export const Note = ({ row, label, instructions, closeModal, placeholder, value, onChange, newValue }: textBox) => {
  const { register, handleSubmit, setValue } = useForm<formInputs>();

  useEffect(() => {
    setValue("text", value ?? newValue ?? "");
  }, [newValue, setValue]);

  const onSubmit = (data: formInputs) => {
    const { text } = data;
    if (instructions) {
      instructions(text);
    }
    closeModal();
  };
  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>{label}</Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            rows={row}
            {...register("text")}
            placeholder={placeholder}
            value={newValue}
            name="text"
            onChange={onChange}
          />
        </Form.Group>
        <Button type="submit" className="w-100" variant="success">
          SAVE
        </Button>
      </Form>
    </div>
  );
};
