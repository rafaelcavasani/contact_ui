import React from "react";
import { Switch, Route } from "react-router-dom";

import ContactPage from "../pages/Contact";
import ContactCreatePage from "../pages/Contact/ContactCreate";
import ContactEditPage from "../pages/Contact/ContactEdit";
import NotFoundPage from "../pages/NotFound";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={ContactPage} />
      <Route path="/contacts/create" exact component={ContactCreatePage} />
      <Route path="/contacts/edit:id" exact component={ContactEditPage} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  );
}
