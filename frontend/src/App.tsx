import { Col, Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { Menu } from "./components";
import { ShoppingCartProvider } from "./contexts/shoppingCartContext";
import { About, Home, Store } from "./pages";
function App() {
  return (
    <ShoppingCartProvider>
      <Container fluid="md">
        <section className="h-100 d-flex align-items-center justify-content-center">
          <Col xs={12} md={12} lg={6} className="mb-3 ">
            <Menu />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/about" element={<About />}></Route>
              <Route path="/store" element={<Store />}></Route>
            </Routes>
          </Col>
        </section>
      </Container>
    </ShoppingCartProvider>
  );
}

export default App;
