import { defaultNS } from 'link-lib'
import { NamedNode } from 'rdflib'
import { app } from '../helpers/app'

/**
 * Link-lib has been designed to process delta's. Every action on the server should return a description
 * of the difference between the state before and after the action, thus synchronizing the front-end
 * with the back-end state without duplicate logic.
 *
 * @see https://github.com/ontola/linked-delta for definitions (they're pretty obvious though).
 */
const replaceGraph = (graph) => defaultNS.ll(`replace?graph=${encodeURIComponent(graph.value)}`);

const appMiddleware = (store) => {
  // Register our namespace, this will contain app-specific models (we could use any RDF app model)
  store.namespaces.app = app;
  const NS = store.app;

  // We build IRI's manually here, but real-world would abstract this into the data via declarative forms.
  function actionIRI(subject, action, payload = {}) {
    const query = [
      subject && `iri=${encodeURIComponent(subject.value)}`,
      ...Object.entries(payload).map(([k, v]) => [k, encodeURIComponent(v.value || v)].join('=')),
    ].filter(Boolean).join('&');

    return NS.app(`${action}?${query}`);
  }

  const processDeltaNow = (delta) => {
    return store.processDelta(delta, true);
  }

  /**
   * Create an object for our action dispatchers, this eases executing (application based) actions
   * It also creates a nice interface between components and the action IRI's for faster refactoring
   *
   * When executing these methods from app code, the action will be scheduled for processing. Actual
   * data changes will be made by the middleware handler below.
   */
  store.actions.app = {};
  store.actions.app.initialize = (subject) => store.exec(actionIRI(subject, 'initialize'));
  store.actions.app.save = (subject) => store.exec(actionIRI(subject, 'save'));

  /**
   * Middleware handler
   */
  return next => (iri, opts) => {
    if (!iri.value.startsWith(NS.app('').value)) {
      return next(iri, opts);
    }

    if (iri.value.startsWith(NS.app('initialize').value)) {
      return Promise.resolve();
    }

    if (iri.value.startsWith(NS.app('save').value)) {
      const resource = new URL(iri.value).searchParams.get('iri');
      return store.api.fetcher.putBack(new NamedNode(resource));
    }

    return next(iri, opts);
  };
};

export default appMiddleware;
