import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

type textBox = {
  row: number;
  label: string;
};
export const Note = ({ row, label }: textBox) => {
  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>{label}</Form.Label>
          <Form.Control as="textarea" rows={row} autoFocus />
        </Form.Group>
        <Button className="w-100" variant="success">
          SAVE
        </Button>
      </Form>
    </div>
  );
};
