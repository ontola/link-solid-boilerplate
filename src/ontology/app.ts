import { createNS } from "@ontologies/core";

import { applicationURL } from "../config";

const app = createNS(applicationURL);

export default {
  ns: app,
};
