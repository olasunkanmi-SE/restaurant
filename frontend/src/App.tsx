import { Col, Container } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import { Navigation } from "./components";
import { Checkout } from "./components/Checkout";
import { ShoppingCartProvider } from "./contexts/shoppingCartContext";
import { About, FoodMenu, Home, SignUp } from "./pages";

function App() {
  return (
    <ShoppingCartProvider>
      <Container fluid="md">
        <section className="h-100 d-flex align-items-center justify-content-center">
          <Col xs={12} md={12} lg={6} className="mb-3 ">
            <Navigation />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/about" element={<About />}></Route>
              <Route path="/menu" element={<FoodMenu />}></Route>
              <Route path="/register" element={<SignUp />}></Route>
              <Route path="/register" element={<SignUp />}></Route>
              <Route path="*" element={<Navigate to=".." />}></Route>
            </Routes>
            <Checkout />
          </Col>
        </section>
      </Container>
    </ShoppingCartProvider>
  );
}

export default App;
