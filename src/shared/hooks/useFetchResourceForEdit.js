import { useEffect, useState } from "react";

import api from "../../services/api";
import notificationMessage from "../components/notificationMessage";

const RESULT_INITIAL_STATE = {
  modified: null,
  original: null,
};
const PARAMS_INITIAL_STATE = null;
const LOADING_INITIAL_STATE = false;
const REFETCH_INITIAL_STATE = true;

export default function useFetchResourceForEdit(
  apiUrl,
  params = PARAMS_INITIAL_STATE
) {
  const [result, setResult] = useState(RESULT_INITIAL_STATE);
  const [loading, setLoading] = useState(LOADING_INITIAL_STATE);
  const [refetch, setRefetch] = useState(REFETCH_INITIAL_STATE);

  useEffect(() => {
    function buildUrl() {
      const query = params
        ? `?${Object.keys(params)
            .map((key) => `${key}=${params[key]}`)
            .join("&")}`
        : "";

      return `${apiUrl}${query}`;
    }

    async function fetchResource() {
      try {
        setLoading(true);

        const { data } = await api.get(buildUrl());

        setResult({
          modified: data,
          original: data,
        });
        setLoading(false);
        setRefetch(false);
      } catch (exception) {
        setResult(RESULT_INITIAL_STATE);
        setLoading(false);
        setRefetch(false);
        notificationMessage(
          "Error ao buscar um recurso para edição",
          `Ocorreu um erro no sistema: ${exception}`,
          "error"
        );
      }
    }

    if (refetch) fetchResource();
  }, [apiUrl, params, refetch]);

  return [result, loading, setRefetch];
}
