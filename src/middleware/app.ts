import { NamedNode } from "@ontologies/core";
import rdfx from "@ontologies/rdf";
import { createActionPair } from "@rdfdev/actions";
import { replace } from "@rdfdev/delta";
import { MiddlewareActionHandler } from "link-lib";
import { LinkReduxLRSType } from "link-redux";

import app from '../ontology/app'

/**
 * Link-lib has been designed to process delta's. Every action on the server should return a description
 * of the difference between the state before and after the action, thus synchronizing the front-end
 * with the back-end state without duplicate logic.
 *
 * @see https://github.com/ontola/linked-delta for definitions (they're pretty obvious though).
 */

/**
 * The parameters for the action IRI's which can be used.
 */
interface AppParams {
  iri: NamedNode;
}

export const appMiddleware = (store: LinkReduxLRSType) => {
  /**
   * Helper object for dispatching and parsing actions.
   */
  const { dispatch, parse } = createActionPair<AppParams>(app.ns, store);

  /**
   * Create an object for our action dispatchers, this eases executing (application based) actions
   * It also creates a nice interface between components and the action IRI's for faster refactoring
   *
   * When executing these methods from app code, the action will be scheduled for processing. Actual
   * data changes will be made by the middleware handler below.
   */
  store.actions.app = {
    /**
     * Initialize an 'app' file
     */
    initialize: (iri: NamedNode) => dispatch('initialize', { iri }),
    /**
     * Initialize an 'app' file
     */
    save: (iri: NamedNode) => dispatch('save', { iri }),
  };

  const initialize = (iri: NamedNode) => [
    replace(iri, rdfx.type, app.ns("MyClass")),
  ];

  /**
   * Middleware handler
   */
  return (next: MiddlewareActionHandler) => (iri: NamedNode, opts: any): Promise<any> => {
    if (!iri.value.startsWith(app.ns('').value)) {
      return next(iri, opts);
    }

    const { base, params } = parse(iri);

    switch (base.value) {
      case app.ns('initialize').value: {
        /*
         * Generate and dispatch a delta to initialize a resource for your type here.
         */
        return store.processDelta(initialize(params.iri!));
      }

      case app.ns('save').value: {
        /*
         * If needed, do some pre-save modifications here
         */
        return store.actions.solid.save(params.iri);
      }

      default: {
        return next(iri, opts);
      }
    }
  };
};
