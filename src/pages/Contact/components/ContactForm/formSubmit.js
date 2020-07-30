import api from "../../../../services/api";

export async function handleContactSubmited(contact) {
  const { data } =
    contact.id === 0
      ? await api.post("contacts/", contact)
      : await api.put(`contacts/${contact.id}/`, contact);

  return data;
}
