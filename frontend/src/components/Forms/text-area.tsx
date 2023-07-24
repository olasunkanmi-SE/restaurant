import { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";

type textBox = {
  row: number;
  label: string;
  noteFromChild: (note: string) => void;
};
type formInputs = {
  text: string;
};
export const Note = ({ row, label, noteFromChild }: textBox) => {
  const [note, setNote] = useState<string>("");

  const { register, handleSubmit } = useForm<formInputs>();

  const onSubmit = (data: formInputs) => {
    const { text } = data;
    setNote(text);
    noteFromChild(text);
  };
  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>{label}</Form.Label>
          <Form.Control as="textarea" rows={row} {...register("text")} autoFocus />
        </Form.Group>
        <Button type="submit" className="w-100" variant="success">
          SAVE
        </Button>
      </Form>
    </div>
  );
};
