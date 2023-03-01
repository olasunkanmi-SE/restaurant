import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { About, Store, Home } from "./pages";
import { Menu } from "./components";
import { ShoppingCartProvider } from "./contexts/shoppingCartContext";
function App() {
  return (
    <ShoppingCartProvider>
      <Container className="mb-4 fluid='md'">
        <Menu />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/store" element={<Store />}></Route>
        </Routes>
      </Container>
    </ShoppingCartProvider>
  );
}

export default App;
