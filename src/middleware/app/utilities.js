import { defaultNS } from 'link-lib';
import { Namespace } from 'rdflib';

export const addGraph = (graph) => defaultNS.ll(`add?graph=${encodeURIComponent(graph.value)}`);

export const namespaceForList = (listIRI) => Namespace(`${listIRI.value}#`);
