/**
 * This file contains the code to run your app in standalone mode. It sets up the necessary store
 * objects and mounts the application into the dom.
 *
 * @module app
 */

import './public/standalone.css'
import './public/app.css'
import './useFactory';

import { createLRS } from "@ontola/mash";
import rdf from '@ontologies/core';
import { Location } from 'history';
import {
  LinkedResourceContainer,
  LinkReduxLRSType,
  RenderStoreProvider,
} from "link-redux";
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import FileSelector from './components/FileSelector';
import { applicationURL } from "./config";
import middleware from "./middleware";
import views from "./views";

const App = ({ lrs }: { lrs: LinkReduxLRSType }) => {
  const Text = ({ location }: { location: Location }) => {
    const resource = new URLSearchParams(location.search).get('resource');

    if(!resource) {
      return (
        <p
          className="TodoMessage"
          style={{
            fontStyle: 'italic',
            padding: '10px',
            textAlign: 'center',
          }}
        >
          Enter a file or directory above and click open
        </p>
      );
    }

    // lrs.getEntity(rdf.namedNode(resource), { reload: true });
    return (
      <LinkedResourceContainer subject={rdf.namedNode(resource)} />
    );
  };

  const pathname = new URL(applicationURL).pathname;

  return (
    <RenderStoreProvider value={lrs} >
      <BrowserRouter basename={pathname.endsWith('/') ? pathname.slice(0, -1) : pathname}>
        <FileSelector />
        <Switch>
          <Route key="resource" path="*" component={Text} />
        </Switch>
      </BrowserRouter>
    </RenderStoreProvider>
  );
};

(function init() {
  const { lrs } = createLRS({
    makeGlobal: true,
    middleware,
    views,
  });

  // @deprecated TODO
  (lrs.api as any).accept.default = "text/turtle";

  ReactDOM.render(
    React.createElement(App, { lrs }),
    document.getElementById('standaloneApp')
  );
})();
