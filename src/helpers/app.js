import { Namespace } from "rdflib"
import packageJSON from '../../package.json'

export const appNS = Namespace(packageJSON.applicationURL.production);
