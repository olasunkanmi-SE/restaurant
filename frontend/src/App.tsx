import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { About, Store, Home } from "./pages";
import { Menu } from "./components";

function App() {
  return (
    <Container className="App">
      <Menu />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/Store" element={<Store />}></Route>
      </Routes>
    </Container>
  );
}

export default App;
