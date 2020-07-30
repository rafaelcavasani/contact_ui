import React from "react";

import ContactForm from "../components/ContactForm";

const CONTACT_CREATION_SHAPE = {
  id: 0,
  name: "",
  age: 0,
  phones: [],
};

const CONTACT_CREATION_INITIAL_STATE = {
  modified: CONTACT_CREATION_SHAPE,
  original: CONTACT_CREATION_SHAPE,
};

export default function ContactCreatePage() {
  return (
    <ContactForm
      contact={CONTACT_CREATION_INITIAL_STATE}
      cardTitle="CRIAR NOVO CONTATO"
    />
  );
}
