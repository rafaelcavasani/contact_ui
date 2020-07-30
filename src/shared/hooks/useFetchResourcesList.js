import { useEffect, useState } from "react";

import api from "../../services/api";
import notificationMessage from "../components/notificationMessage";

const FILTER_INITIAL_STATE = null;
const RESULT_INITIAL_STATE = null;
const LOADING_INITIAL_STATE = false;
const COUNT_INITIAL_STATE = null;

export default function useFetchResourcesList(apiUrl, fetchOnRender = false) {
  const [result, setResult] = useState(RESULT_INITIAL_STATE);
  const [countResult, setCountResult] = useState(COUNT_INITIAL_STATE);
  const [filters, setFilters] = useState(FILTER_INITIAL_STATE);
  const [loading, setLoading] = useState(LOADING_INITIAL_STATE);

  useEffect(() => {
    function buildUrl() {
      const params = filters
        ? Object.keys(filters)
            .map((key) => `${key}=${filters[key]}`)
            .join("&")
        : "";

      return `${apiUrl}/?${params}`;
    }

    async function fetchResource() {
      try {
        setLoading(true);
        const { data } = await api.get(buildUrl());
        const { count } = data;
        setCountResult(count);
        const dataWithKey = data.results.map((d) => ({
          key: d.id,
          ...d,
        }));

        setResult(dataWithKey);
        setLoading(false);
      } catch (exception) {
        setResult(RESULT_INITIAL_STATE);
        setLoading(false);
        notificationMessage(
          "Error tentando buscar um recurso",
          `Ocorreu um erro no sistema: ${exception}`,
          "error"
        );
      }
    }

    if (filters !== null || fetchOnRender) fetchResource();
  }, [apiUrl, fetchOnRender, filters]);

  return [
    result,
    countResult,
    loading,
    (filter) => setFilters({ ...filters, ...filter }),
  ];
}
