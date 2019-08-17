import { Namespace, Statement } from 'rdflib'
import { defaultNS as NS } from 'link-lib';

import minesweeper from "./middleware/minesweeper";
import views from "./views/index";

export default ((lrs) => {
  const sweepNS = Namespace("https://fletcher91.github.io/link-minesweeper/")
  lrs.registerModule({
    iri: "https://fletcher91.github.io/link-minesweeper/MinesweeperGame",
    middlewares: [
      minesweeper,
    ],
    ontologyStatements: [
      new Statement(NS.rdfs('Bag'), NS.rdfs('subClassOf'), NS.rdfs('Resource')),
      new Statement(sweepNS('MinesweeperGame'), NS.rdfs('subClassOf'), NS.rdfs('Bag')),
      new Statement(sweepNS('MinesweeperGame'), NS.rdf("type"), NS.ll("CreatableFileFormat")),
    ],
    version: 1,
    views,
  });
})(window.LRS);
