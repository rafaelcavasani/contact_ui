import React from "react";
import { Result, Button } from "antd";
import history from "../../services/history";

export default function HomePage() {
  function handleClick() {
    history.push("/");
  }
  return (
    <Result
      status="404"
      title="404"
      subTitle="Página não encontrada."
      extra={
        <Button type="primary" onClick={handleClick}>
          Início
        </Button>
      }
    />
  );
}
