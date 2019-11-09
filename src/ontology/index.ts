import { Quad } from "@ontologies/core";

import { ldpOntology } from "./ldp";
import { llOntology } from "./ll";
import { vcardOntology } from "./vcard";

const allOntology: Quad[] = [
  ...ldpOntology,
  ...llOntology,
  ...vcardOntology,
];

export default allOntology
