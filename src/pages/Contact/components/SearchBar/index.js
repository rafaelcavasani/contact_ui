import React from "react";
import { Row, Form, Button, Input, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import history from "../../../../services/history";

const { Search } = Input;

export default function SearchBar({ handleContactSearch }) {
  const [form] = Form.useForm();

  function handleContactCreation() {
    history.push("/contacts/create");
  }

  return (
    <>
      <Form form={form}>
        <Row>
          <Col span={14}>
            <Form.Item name="contactFilter">
              <Search
                placeholder="Buscar contato pelo nome ou telefone..."
                onSearch={handleContactSearch}
                enterButton
                name="contactFilter"
              />
            </Form.Item>
          </Col>
          <Col span={6} offset={4}>
            <Form.Item>
              <Button type="primary" onClick={handleContactCreation} block>
                <PlusOutlined />
                Cadastrar Contato
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
}
