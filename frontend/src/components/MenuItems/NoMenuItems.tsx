import { Form, Stack } from "react-bootstrap";

type NoItems = {
  handleCheck: (event: React.MouseEvent<HTMLElement>) => void;
  isChecked: boolean;
};

export const NoMenuItems = ({ handleCheck, isChecked }: NoItems) => {
  return (
    <div style={{ marginBottom: "-14px" }} className="pt-1 elBg">
      <Stack direction="horizontal" gap={3}>
        <div style={{ marginLeft: "6px" }}>
          <Form.Check onClick={handleCheck} className="mr-2" type="checkbox" checked={isChecked} readOnly />
        </div>
        <div style={{ marginLeft: "10px", marginTop: "5px" }}>None</div>
      </Stack>
      <hr></hr>
    </div>
  );
};
