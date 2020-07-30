import React from "react";
import PropTypes from "prop-types";

import ContactForm from "../components/ContactForm";

import useFetchResourceForEdit from "../../../shared/hooks/useFetchResourceForEdit";
import LoadingComponent from "../../../shared/components/Loading";

export default function ContactEditPage({ match }) {
  const { id } = match.params;
  const [result, loading, setRefetch] = useFetchResourceForEdit(
    `contacts/${id}`
  );

  function handleRefetch() {
    setRefetch(true);
  }

  return (
    <>
      {!loading ? (
        <ContactForm
          id={id}
          agreement={result}
          loading={loading}
          cardTitle="EDITAR CONTATO"
          onRefetch={handleRefetch}
        />
      ) : (
        <LoadingComponent loading={loading} />
      )}
    </>
  );
}

ContactEditPage.propTypes = {
  match: PropTypes.oneOfType([PropTypes.element, PropTypes.object]).isRequired,
};
