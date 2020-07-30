import React, { useState } from "react";
import {} from "antd";
import {} from "@ant-design/icons";

import SearchBar from "./components/SearchBar";
import TableList from "./components/TableList";
import useFetchResourcesList from "../../shared/hooks/useFetchResourcesList";

const limit = 25;

export default function ContactPage() {
  const [contactList, countResult, loading, setFilters] = useFetchResourcesList(
    "contacts"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  function handleContactSearch(text) {
    const offset = (currentPage - 1) * limit;
    const submitText = text ? text : searchText;
    setFilters({
      text: submitText,
      limit,
      offset,
    });
    setSearchText(submitText);
  }

  function handlePageChange(page) {
    setCurrentPage(page);
    handleContactSearch(searchText);
  }

  return (
    <div className="container">
      <h3 className="header">CONTATOS</h3>
      <SearchBar handleContactSearch={handleContactSearch} />
      <TableList
        loading={loading}
        dataSource={contactList}
        count={countResult}
        currentPage={currentPage}
        onCurrentPageChange={handlePageChange}
        limit={limit}
        updateResourcesList={handleContactSearch}
      />
    </div>
  );
}
