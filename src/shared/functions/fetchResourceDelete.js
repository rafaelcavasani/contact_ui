import api from "../../services/api";
import notificationMessage from "../components/notificationMessage";

export async function fetchResourceDelete(id, uri) {
  if (id !== 0 && uri) {
    try {
      const response = await api.delete(`${uri}/${id}/`);
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (exception) {
      notificationMessage(
        "Error ao excluir recurso",
        `Ocorreu um erro no sistema: ${exception}`,
        "error"
      );
      return false;
    }
  } else {
    notificationMessage(
      "Error ao excluir recurso",
      "Informe o id e o recurso que deverá ser excluído",
      "error"
    );
    return false;
  }
}
