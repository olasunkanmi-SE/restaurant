import { Menu } from "semantic-ui-react";

export type MenuItems = {
  names: string[];
  activeItem: string;
  handleItemClick: (event: React.MouseEvent<HTMLAnchorElement>, activeItem: string) => void;
};

export const Header = ({ names, handleItemClick, activeItem }: MenuItems) => {
  const renderedMenu = names.map((name) => {
    return (
      <Menu.Item
        key={name}
        name={name}
        active={activeItem === name}
        onClick={(event) => {
          handleItemClick(event, name);
        }}
      >
        {name}
      </Menu.Item>
    );
  });
  return (
    <div>
      <Menu>
        {renderedMenu}
        <Menu.Menu position="right">
          <Menu.Item
            name="logout"
            active={activeItem === "logout"}
            onClick={(event) => {
              handleItemClick(event, "logout");
            }}
          />
        </Menu.Menu>
      </Menu>
    </div>
  );
};
