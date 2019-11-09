/**
 * This file contains the entry point when the app is distributed as a [Mash package](https://github.com/ontola/mash#mash-browser).
 *
 * When mash loads your package from the web, the package will register itself by calling
 * {registerModule} on the global store. This will register the custom middleware and views
 * enabling the functionality in that instance.
 *
 * @module package
 */

import { applicationURL } from "./config";
import { appMiddleware } from "./middleware/app";
import ontology from "./ontology/index";
import views from "./views/index";

import packageJSON from "../package.json";

export default ((lrs) => {
  lrs.registerModule({

    iri: applicationURL,

    middlewares: [
      appMiddleware,
    ],

    ontologyStatements: ontology,

    version: packageJSON.version,

    views,
  });
})((window as any).LRS);
