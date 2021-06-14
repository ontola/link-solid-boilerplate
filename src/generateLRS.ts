import rdf, { Quad } from '@ontologies/core';
import * as foaf from '@ontologies/foaf';
import * as owl from '@ontologies/owl';
import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import { createBrowserHistory } from 'history';
import { MiddlewareFn, createStore } from 'link-lib';
import { LinkReduxLRSType } from 'link-redux';

import { FRONTEND_ACCEPT } from './config';
import logging from './middleware/logging';
import { appOntology, website } from './ontology/app';
import ll from './ontology/ll';

import { handle } from './middleware/logging';
import transformers from './helpers/transformers';
import hexjson from './helpers/hexJSON';

export interface LRSBundle {
  history: unknown;
  lrs: LinkReduxLRSType;
}

export default function generateLRS(initialDelta: Quad[] = []): LRSBundle {
  const history = createBrowserHistory();

  const middleware: Array<MiddlewareFn<any>> = [
    logging(),
  ];
  const storeOptions = { report: handle };
  const lrs = createStore<React.ComponentType<any>>(storeOptions, middleware);
  (lrs as any).bulkFetch = true;

  lrs.api.registerTransformer(hexjson.transformer(lrs), hexjson.mediaTypes, hexjson.acceptValue);
  transformers(lrs).forEach((t) =>
    lrs.api.registerTransformer(t.transformer, t.mediaTypes, t.acceptValue),
  );

  if (!website) {
    handle(new Error('No website in head'));
  }

  // @ts-ignore TS2341
  lrs.api.accept.default = FRONTEND_ACCEPT;

  // Globally disable anti-jump rendering
  (lrs as any).broadcast_old = (lrs as any).broadcast;
  (lrs as any).broadcast = (_: boolean, __: number) => (lrs as any).broadcast_old(false, 0);

  const languages = {
    en: 'en',
    nl: 'nl',
  };

  const THING_TYPES = [
    schema.Thing,
    rdfs.Resource,
    owl.Thing,
  ].map((t) => rdf.id(t));

  lrs.store.getInternalStore().newPropertyAction(rdfx.type, (q: Quad): boolean => {
    if (THING_TYPES.includes(rdf.id(q.object))) {
      return false;
    }
    lrs.schema.addQuads([rdf.quad(q.object, rdfs.subClassOf, schema.Thing)]);

    return false;
  });

  // tslint:disable max-line-length
  const ontologicalClassData = [
    rdf.quad(schema.Thing, rdfs.subClassOf, rdfs.Resource),
    rdf.quad(owl.Thing, owl.sameAs, schema.Thing),

    rdf.quad(schema.Thing, rdfx.type, rdfs.Class),
    rdf.quad(schema.Thing, rdfs.comment, rdf.literal('The most generic type of item.')),
    rdf.quad(schema.Thing, rdfs.label, rdf.literal('Thing', languages.en)),
  ];
  // tslint:enable max-line-length

  lrs.addOntologySchematics(ontologicalClassData);
  lrs.store.addQuads(ontologicalClassData);

  const ontologicalPropertyData = [
    rdf.quad(foaf.name, owl.sameAs, schema.name),
    rdf.quad(schema.name, rdfx.type, rdfx.Property),
  ];

  lrs.addOntologySchematics(ontologicalPropertyData);
  lrs.store.addQuads(ontologicalPropertyData);

  const ontologyData = [
    ...appOntology,
    rdf.quad(ll.loadingResource, rdfx.type, ll.LoadingResource),
  ];

  lrs.store.addQuads(ontologyData);

  if (initialDelta.length > 0) {
    lrs.processDelta(initialDelta);
  }

  return {
    history,
    lrs,
  };
}
