/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from "react";
import { Switch, Route } from "react-router-dom";
import { NotFound } from "strapi-helper-plugin";
// Utils
import pluginId from "../../pluginId";
// Containers
import HomePage from "../HomePage";
import UseCasePage from "../UseCasePage";
import SectionPage from "../SectionPage";
import CardSectionPage from "../CardSectionPage";

const App = () => {
  return (
    <div>
      <Switch>
        <Route path={`/plugins/${pluginId}`} component={HomePage} exact />
        <Route
          path={`/plugins/${pluginId}/section/:id`}
          component={SectionPage}
        />
        <Route
          path={`/plugins/${pluginId}/cards/:id`}
          component={CardSectionPage}
        />
        <Route
          path={`/plugins/${pluginId}/use_case/:id`}
          component={UseCasePage}
        />

        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
