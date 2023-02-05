import React, { useState } from "react";
import { Header } from "./components/Header";
import { menuItems } from "./constants";

function App() {
  const [activeItem, setActiveItem] = useState<string>("Home");
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, activeItem: string) => {
    setActiveItem(activeItem);
  };
  return (
    <div className="App">
      <Header names={menuItems} activeItem={activeItem} handleItemClick={handleClick} />
    </div>
  );
}

export default App;
