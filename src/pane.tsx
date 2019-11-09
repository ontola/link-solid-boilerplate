/**
 * This file exports a Pane which can be registered in the [mashlib](https://github.com/solid/mashlib/)
 * browser.
 */

import { basePane } from '@ontola/mash'

import views from "./views/index";

export default {
  /** Use setup and structure from the @ontola/mash base pane */
  ...basePane,

  /** List of rdf:type IRIs the pane should render for, leave blank to always render this pane. */
  types: [],

  /** The views enabled for this pane */
  views,
}
