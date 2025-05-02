import React, { CSSProperties } from "react";
import { Tabs, Tab } from "react-bootstrap";

interface TabProps {
  title: string;
  children: React.ReactNode;
}

interface TabComponentProps {
  tabs: TabProps[];
  style?: CSSProperties;
}

export const TabComponent = ({ tabs, style }: Readonly<TabComponentProps>) => {
  const renderTabs = () => {
    return tabs.map(({ title, children }) => (
      <Tab style={style} key={title} eventKey={title} title={title}>
        {children}
      </Tab>
    ));
  };

  return (
    <Tabs defaultActiveKey={"Email"} className="mb-3">
      {renderTabs()}
    </Tabs>
  );
};
