import { createStore } from 'link-lib'
import { Namespace, Statement } from 'rdflib';

import logging from './middleware/logging'
import solidMiddleware from './middleware/solid';

const LRS = createStore({}, [
	logging(),
	solidMiddleware,
]);

LRS.namespaces.ldp = Namespace('http://www.w3.org/ns/ldp#');
LRS.namespaces.vcard = Namespace('http://www.w3.org/2006/vcard/ns#');
export const NS = LRS.namespaces;

// Fix an issue due to github pages serving html
LRS.api.registerTransformer(
	() => [],
	'text/html',
	1.0
);

/**
 * View lookup is, amongst other things, based on class depth.
 * By default our TODOList class is as deep as http://www.w3.org/2007/ont/link#Document (both 1)
 *
 * A feature to bump certain classes would be a good future addition.
 */
LRS.addOntologySchematics([
	new Statement(NS.rdfs('Bag'), NS.rdfs('subClassOf'), NS.rdfs('Resource')),
	// new Statement(Namespace("https://fletcher91.github.io/link-minesweeper/")('MinesweeperGame'), NS.rdfs('subClassOf'), NS.rdfs('Bag')),
])
LRS.api.accept.default = "text/turtle"

window.LRS = LRS;

export default LRS;
