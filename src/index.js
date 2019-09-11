import { Namespace, Statement } from 'rdflib'
import { defaultNS as NS } from 'link-lib';

import packageJSON from "../package.json";

import views from "./views/index";

export default ((lrs) => {
  const appNS = Namespace(packageJSON.applicationURL.production)
  lrs.registerModule({
    iri: "<TODO: FILL IN>",
    middlewares: [],
    ontologyStatements: [
      new Statement(NS.rdfs('Bag'), NS.rdfs('subClassOf'), NS.rdfs('Resource')),
      // new Statement(appNS('MinesweeperGame'), NS.rdfs('subClassOf'), NS.rdfs('Bag')),
      // new Statement(appNS('MinesweeperGame'), NS.rdf("type"), NS.ll("CreatableFileFormat")),
    ],
    version: 1,
    views,
  });
})(window.LRS);
