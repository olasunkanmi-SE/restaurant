import { Col, Container } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import { ShoppingCartProvider } from "./contexts/shoppingCartContext";
import { About, FoodMenu, Home, SignUp, Login } from "./pages";
import { CheckOutOrAddToCart } from "./components/Utilities/Conditional";
import { Navigation } from "./components/Utilities/Navbar";
import { Landing } from "./pages/Landing";

function App() {
  return (
    <ShoppingCartProvider>
      <Container fluid="md">
        <section className="h-100 d-flex align-items-center justify-content-center">
          <Col xs={12} md={12} lg={6} className="mb-3 ">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Navigation />
                    <CheckOutOrAddToCart />
                  </>
                }
              >
                <Route index element={<Landing />} />
                <Route path="/menu" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="menu/:id" element={<FoodMenu />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to=".." />} />
              </Route>
            </Routes>
          </Col>
        </section>
      </Container>
    </ShoppingCartProvider>
  );
}

export default App;
