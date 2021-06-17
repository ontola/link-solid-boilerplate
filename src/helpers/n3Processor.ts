import rdf, { isBlankNode, isLiteral, isNamedNode, Quad } from "@ontologies/core";
import { LinkedRenderStore } from "link-lib/dist-types/LinkedRenderStore";
import { ResponseAndFallbacks, ResponseTransformer } from "link-lib/dist-types/types";
// @ts-ignore
import { Parser } from "n3";

const getBody = async (res: ResponseAndFallbacks): Promise<[string, string]> => {
  if (!(res instanceof Response)) {
    throw new Error("Response type unsupported")
  }

  return [await res.text(), res.url];
}

const convert = (test: unknown) => {
  if (isNamedNode(test)) {
    return rdf.namedNode(test.value);
  }
  if (isBlankNode(test)) {
    return rdf.blankNode(test.value);
  }
  if (isLiteral(test)) {
    return rdf.literal(test.value, test.language ?? test.datatype);
  }

  throw new Error("Recieved malformed term from N3 library");
}

const parse = (body: string, baseIRI: string): Promise<Quad[]> => {
  const parser = new Parser({
    baseIRI,
  });
  const data: Quad[] = [];

  return new Promise((resolve, reject) => {
    try {
      parser.parse(
        body,
        (error: Error, quad: Quad, _: unknown) => {
          if (error) {
            return reject(error);
          } else if (quad) {
            // We have to convert the quad since the N3 library doesn't adhere to dynamic rdf factories via @ontologies/core
            data.push(rdf.quad(
              convert(quad.subject),
              convert(quad.predicate),
              convert(quad.object),
            ));
          } else {
            resolve(data);
          }
        });
    } catch(e) {
      reject(e);
    }
  });
}

export function n3Processor(lrs: LinkedRenderStore<any>): ResponseTransformer {

  return async (response: ResponseAndFallbacks): Promise<Quad[]> => {
    const [body, baseIRI] = await getBody(response);
    const data = await parse(body, baseIRI);

    await lrs.processDelta(data);

    return data;
  };
}
