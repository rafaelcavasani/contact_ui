import React from "react";
import PropTypes from "prop-types";
import { Table, Pagination, Empty, Space, Tooltip } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";

import { fetchResourceDelete } from "../../../../shared/functions/fetchResourceDelete";

export default function ProfessionalsTableList({
  loading,
  dataSource,
  count,
  currentPage,
  onCurrentPageChange,
  limit,
  updateResourcesList,
}) {
  async function handleDelete(key) {
    const result = await fetchResourceDelete(key, "contacts");
    if (result) {
      updateResourcesList();
    }
  }

  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Idade",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Ações",
      dataIndex: "id",
      key: "id",
      render: (text, record) => (
        <Space size="middle">
          <Tooltip title="Editar">
            <Link to={`/contacts/edit/${record.key}`}>
              <EditFilled style={{ color: "#265573" }} />
            </Link>
          </Tooltip>
          <Tooltip title="Excluir">
            <DeleteFilled
              onClick={() => handleDelete(record.key)}
              style={{ color: "#b52a2a" }}
            />
          </Tooltip>
        </Space>
      ),
      width: "10%",
    },
  ];
  return (
    <>
      <Table
        loading={loading}
        dataSource={dataSource}
        columns={columns}
        bordered
        pagination={false}
        locale={{
          filterConfirm: "Ok",
          filterReset: "Resetar",
          emptyText: <Empty description="Nenhum contato encontrado" />,
        }}
      />
      <Pagination
        pageSize={limit}
        current={currentPage}
        total={count}
        onChange={onCurrentPageChange}
        defaultCurrent={1}
        style={{ marginTop: "1em" }}
      />
    </>
  );
}

ProfessionalsTableList.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.oneOfType([PropTypes.array]),
  count: PropTypes.number,
  currentPage: PropTypes.number.isRequired,
  onCurrentPageChange: PropTypes.func.isRequired,
  limit: PropTypes.number,
  updateResourcesList: PropTypes.func.isRequired,
};

ProfessionalsTableList.defaultProps = {
  loading: false,
  dataSource: null,
  count: null,
  limit: 25,
};
