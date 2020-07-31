import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, Form, Row, Col, Input, Button, Modal, Space } from "antd";
import {
  CloseOutlined,
  CheckOutlined,
  ExclamationCircleOutlined,
  LeftOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import useModifiedState from "../../../../shared/hooks/useModifiedState";
import notificationMessage from "../../../../shared/components/notificationMessage";
import history from "../../../../services/history";
import { parseExceptionMessage } from "../../../../shared/utils/exceptionsHandler";

import { BackNavigationContainer, CardHeaderContainer } from "./styles";
import { handleContactSubmited } from "./formSubmit";

export default function ContactForm({
  contact,
  loading,
  cardTitle,
  onRefetch,
}) {
  const [form] = Form.useForm();
  const [modified, setModified, equalState] = useModifiedState(contact);
  const [phoneList, setPhoneList] = useState([]);
  const [deletedPhones, setDeletedPhones] = useState([]);

  useEffect(() => {
    if (modified) {
      if (
        typeof phoneList !== "undefined" &&
        phoneList !== null &&
        phoneList.length > 0
      ) {
        form.setFieldsValue(modified);
        const { phones } = modified;
        const newPhones = phones.map((number, index) => ({
          id:
            // eslint-disable-next-line no-nested-ternary
            index < phoneList.length && phoneList.length > 0
              ? typeof phoneList[index].id !== "undefined"
                ? phoneList[index].id
                : null
              : null,
          number: number,
          key: index,
        }));
        setPhoneList(newPhones);
      } else {
        const newPhones = modified.phones.map((item, index) => ({
          ...item,
          key: index,
        }));
        setPhoneList(newPhones);
        const { phones } = modified;
        let newPhoneList = [];
        if (
          typeof phones !== "undefined" &&
          phones !== null &&
          phones.length > 0
        ) {
          newPhoneList = phones.map((phone) =>
            typeof phone !== "undefined" && typeof phone.number !== "undefined"
              ? phone.number
              : ""
          );
        }
        const newModified = {
          name: modified.name,
          age: modified.age,
          phones: newPhoneList,
        };
        form.setFieldsValue(newModified);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modified, form]);

  function preparePayload() {
    const newPhones = phoneList.map((item) => ({
      id: item.id,
      number: item.number,
    }));

    return {
      ...modified,
      phones: newPhones,
      deleted_phones: deletedPhones,
    };
  }

  async function handleSubmit() {
    try {
      const validation = await form.validateFields();
      const preparedPayload = preparePayload(validation);

      const data = await handleContactSubmited({
        ...validation,
        ...preparedPayload,
      });
      setPhoneList([]);
      setDeletedPhones([]);

      notificationMessage(
        "Gestão de Contatos",
        `Contato salvo com sucesso`,
        "success"
      );

      if (modified.id === 0) history.push(`/contacts/edit/${data.id}`);
      if (onRefetch) onRefetch();
    } catch (error) {
      const { data } = error.response ? error.response : error;

      notificationMessage(
        "Houve um erro no envio do formulário de contato",
        `${data ? parseExceptionMessage(data) : "Verifique o formulário"}`,
        "error"
      );
    }
  }

  async function handleChange() {
    try {
      const values = await form.getFieldsValue();
      setModified({ ...modified, ...values });
    } catch (error) {
      notificationMessage(
        "Edição de Contatos",
        `Houve um erro na edição do contato: ${error}`,
        "error"
      );
    }
  }

  async function handleContactAdd() {
    try {
      const values = await form.getFieldsValue();
      const newPhones = values.phones;
      newPhones.push("");
      values.phones = newPhones;
      setModified({ ...modified, ...values });
    } catch (error) {
      notificationMessage(
        "Edição de Contatos",
        `Houve um erro na edição do contato: ${error}`,
        "error"
      );
    }
  }

  async function handleContactDelete(key) {
    const deletedPhones = phoneList.find((item) => item.key === key);
    if (deletedPhones && deletedPhones.id) {
      setDeletedPhones([...deletedPhones, { id: deletedPhones.id.toString() }]);
    }
    const newPhones = phoneList.filter((item) => item.key !== key);
    if (newPhones && newPhones.length > 0) {
      const phonesNewKeys = newPhones.map((item, index) => ({
        id: item.id,
        number: item.number,
        key: index,
      }));
      setPhoneList(phonesNewKeys);
      const newModifiedPhones = newPhones.map((item) => item.name);
      try {
        const values = await form.getFieldsValue();
        values.phones = newModifiedPhones;
        setModified({ ...modified, ...values });
      } catch (error) {
        notificationMessage(
          "Edição de Contatos",
          `Houve um erro na edição do contato: ${error}`,
          "error"
        );
      }
    } else {
      setPhoneList([]);
      try {
        const values = await form.getFieldsValue();
        values.phones = [];
        setModified({ ...modified, ...values });
      } catch (error) {
        notificationMessage(
          "Edição de Convênios",
          `Houve um erro na edição do convênio: ${error}`,
          "error"
        );
      }
    }
  }

  function handleCancel() {
    // Means that there are changes at the form
    if (!equalState) {
      Modal.confirm({
        title: "Confirma o Descarte das Informações?",
        icon: <ExclamationCircleOutlined />,
        content: "Existem modificação no formulário. Deseja descartá-las?",
        okText: "Não",
        cancelText: "Sim",
        onCancel: () => {
          history.push("/");
        },
      });
    } else history.push("/");
  }

  return (
    <Card
      loading={loading}
      title={
        <CardHeaderContainer>
          <BackNavigationContainer onClick={handleCancel}>
            <LeftOutlined />
          </BackNavigationContainer>
          {cardTitle}
        </CardHeaderContainer>
      }
    >
      {modified && (
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row>
            <Col
              lg={{ span: 18 }}
              md={{ span: 18 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
            >
              <Form.Item
                label="NOME"
                name="name"
                rules={[
                  { required: true, message: "Este campo é obrigatório" },
                ]}
              >
                <Input placeholder="Nome do contato" onChange={handleChange} />
              </Form.Item>
            </Col>
            <Col
              lg={{ span: 6 }}
              md={{ span: 6 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
            >
              <Form.Item
                label="IDADE"
                name="age"
                rules={[
                  { required: true, message: "Este campo é obrigatório" },
                ]}
              >
                <Input
                  placeholder="Idade do contato"
                  onChange={handleChange}
                  type={"number"}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col flex="auto">
              <Col flex="auto">
                <Card title="TELEFONES">
                  <Form.List name="phones">
                    {(fields) => {
                      return (
                        <div>
                          {fields.map((field, index) => (
                            <Form.Item
                              label={index === 0 ? "Número" : ""}
                              required={false}
                              key={field.key}
                            >
                              <Form.Item
                                {...field}
                                key={field.key}
                                validateTrigger={["onChange", "onBlur"]}
                                rules={[
                                  {
                                    required: true,
                                    whitespace: true,
                                    message:
                                      "Por favor, adicione um valor ou remova o campo",
                                  },
                                ]}
                                noStyle
                              >
                                <Input
                                  placeholder="Número"
                                  style={{ width: "calc(100% - 30px)" }}
                                  onChange={handleChange}
                                />
                              </Form.Item>

                              <MinusCircleOutlined
                                className="dynamic-delete-button"
                                style={{ margin: "0 8px" }}
                                onClick={() => handleContactDelete(field.key)}
                              />
                            </Form.Item>
                          ))}
                          <Form.Item>
                            <Button
                              type="dashed"
                              onClick={() => handleContactAdd()}
                              style={{ width: "100%" }}
                            >
                              <PlusOutlined /> Adicionar Telefone
                            </Button>
                          </Form.Item>
                        </div>
                      );
                    }}
                  </Form.List>
                </Card>
              </Col>
            </Col>
          </Row>

          <Row>&nbsp;</Row>
          <Row>
            <Col
              lg={{ span: 6, offset: 12 }}
              md={{ span: 6, offset: 12 }}
              sm={{ span: 12, offset: 0 }}
              xs={{ span: 12, offset: 0 }}
              flex="auto"
            >
              <Form.Item>
                <Button block onClick={handleCancel}>
                  <CloseOutlined />
                  Cancelar
                </Button>
              </Form.Item>
            </Col>
            <Col
              lg={{ span: 6 }}
              md={{ span: 6 }}
              sm={{ span: 12 }}
              xs={{ span: 12 }}
            >
              <Form.Item>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  disabled={equalState}
                >
                  <CheckOutlined />
                  Salvar
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </Card>
  );
}

ContactForm.propTypes = {
  contact: PropTypes.oneOfType([PropTypes.object]),
  loading: PropTypes.bool,
  cardTitle: PropTypes.string,
  onRefetch: PropTypes.oneOfType([PropTypes.func]),
};

ContactForm.defaultProps = {
  contact: null,
  loading: false,
  cardTitle: null,
  onRefetch: null,
};
