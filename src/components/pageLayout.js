import React from "react";
import { Layout } from "antd";
import Body from "./Body/Body"

const { Header, Content} = Layout;

const pageLayout = () => {
  return (
    <>
      <Layout>
        <Header>  <h1>Drag & Drop Todo App using React</h1></Header>
        <Content><Body/></Content>
        
      </Layout>
    </>
  );
};

export default pageLayout;
