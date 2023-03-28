import { Col, Container } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import { Navigation } from "./components";
import { ShoppingCartProvider } from "./contexts/shoppingCartContext";
import { About, FoodMenu, Home, SignUp } from "./pages";
import { CheckOutOrAddToCart } from "./components/Conditional";

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
                <Route index element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="menu/:id" element={<FoodMenu />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/register" element={<SignUp />} />
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
