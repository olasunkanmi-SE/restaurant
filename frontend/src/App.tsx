import { Col, Container, Row } from "react-bootstrap";
import NavScrollExample from "./components/Navbar";

function App() {
  return (
    <Container className="App">
      <Row>
        <Col>
          <NavScrollExample />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
