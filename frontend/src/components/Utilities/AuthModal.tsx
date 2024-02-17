import { CSSProperties } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const AuthModal = () => {
  const navigate = useNavigate();
  const handleSignIn = () => {
    navigate("/login");
  };
  const buttonStyle: CSSProperties = {
    width: "100%",
    margin: "auto",
  };
  return (
    <div>
      <div style={{ marginBottom: "15px" }}>
        <Button onClick={handleSignIn} variant="dark" className="w-10" size="lg" style={buttonStyle}>
          Sign In
        </Button>
      </div>
      <div>
        <Button variant="outline-dark " className="w-10" size="sm" style={buttonStyle}>
          Continue as a Guest
        </Button>
      </div>
    </div>
  );
};
