import { Namespace, Statement } from 'rdflib'
import { defaultNS as NS } from 'link-lib';

import views from "./views/index";

export default ((lrs) => {
  lrs.registerModule({
    middlewares: [
    ],
    ontologyStatements: [
      new Statement(NS.rdfs('Bag'), NS.rdfs('subClassOf'), NS.rdfs('Resource')),
      new Statement(Namespace("https://fletcher91.github.io/link-redux-todo/")('TodoList'), NS.rdfs('subClassOf'), NS.rdfs('Bag')),
    ],
    version: 1,
    views,
  });
})(window.LRS);
