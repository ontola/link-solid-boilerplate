import rdf, {
  BlankNode,
  Quad,
  SomeTerm,
} from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
// @ts-ignore
import NdjsonStream from 'can-ndjson-stream';
import {
  ExtensionResponse,
  RDFLibFetcherResponse,
  ResponseAndFallbacks,
} from 'link-lib';
import { LinkReduxLRSType } from 'link-redux';

enum HexPosition {
  Subject = 0,
  Predicate,
  Value,
  Datatype,
  Language,
  Graph,
}

let hasReadableStreamConstructor = false;
try {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  new ReadableStream({ start() {} });
  hasReadableStreamConstructor = true;
} catch (e) {
  // ignore
}

export default {
  acceptValue: 1.0,
  mediaTypes: ['application/hex+x-ndjson'],

  transformer: (store: LinkReduxLRSType) => (res: ResponseAndFallbacks): Promise<Quad[]> => {
    const bnMap: { [s: string]: BlankNode } = {};
    // Skip the (expensive) proxy object when parsing
    const quad = rdf.quad.bind(rdf);
    const literal = rdf.literal.bind(rdf);
    const namedNode = rdf.namedNode.bind(rdf);
    const blankNodeF = rdf.blankNode.bind(rdf);
    const defaultGraph = rdf.defaultGraph.bind(rdf);

    const blankNode = (v: string) => {
      if (!bnMap[v]) {
        bnMap[v] = blankNodeF();
      }

      return bnMap[v];
    };

    const object = (v: string, dt: string, l: string): SomeTerm => {
      if (l) {
        return literal(v, l);
      } else if (dt === rdfx.ns('namedNode').value) {
        return namedNode(v);
      } else if (dt === rdfx.ns('blankNode').value) {
        return blankNode(v);
      }

      return literal(v, namedNode(dt));
    };

    const lineToQuad = (h: string[]) => quad(
      h[HexPosition.Subject].startsWith('_:') ? blankNode(h[HexPosition.Subject]) : namedNode(h[HexPosition.Subject]),
      namedNode(h[HexPosition.Predicate]),
      object(h[HexPosition.Value], h[HexPosition.Datatype], h[HexPosition.Language]),
      h[HexPosition.Graph] ? namedNode(h[HexPosition.Graph]) : defaultGraph(),
    );


    const delta: Quad[] = [];
    let parse;

    if (res instanceof Response && hasReadableStreamConstructor) {
      const stream = new NdjsonStream(res.body);
      const reader = stream.getReader();

      let read: any;
      parse = reader
        .read()
        .then(read = (result: { done: boolean, value: string[] }) => {
          if (result.done) {
            return;
          }

          delta.push(lineToQuad(result.value));

          return reader.read().then(read);
        });
    } else {
      let body;
      if (res instanceof Response) {
        body = res.text();
      } else if (typeof XMLHttpRequest !== 'undefined'
        && res instanceof XMLHttpRequest
        || typeof (res as any).responseText === 'string') {
        body = Promise.resolve((res as XMLHttpRequest | RDFLibFetcherResponse).responseText);
      } else {
        body = Promise.resolve((res as ExtensionResponse).body);
      }

      parse = body
        .then((text) => {
          for (const line of text.split('\n')) {
            if (line.length > 0) {
              delta.push(lineToQuad(JSON.parse(line)));
            }
          }
        });
    }

    return parse
      // eslint-disable-next-line no-prototype-builtins
      .then(() => store.queueDelta(delta, res.hasOwnProperty('expedite') ? (res as any).expedite : false))
      .then(() => []);
  },
};
