import { LinkReduxLRSType, RegistrableComponent, register } from 'link-redux'
import ErrorResource from './ErrorResource'
import Person from './foaf/Person'
import PersonalProfileDocument from './foaf/PersonalProfileDocument'
import PersonPreviewList from './foaf/PersonPreviewList'
import Container from './ldp/Container'
import Dates from './Literal/Dates'
import LoadingResource from './LoadingResource'
import Resource from './rdfsResource/Resource'
import ResourceBrowserList from './rdfsResource/ResourceBrowserList'

const getViews = (): RegistrableComponent<any>[] => [
  Container,
  Dates,
  ErrorResource,
  LoadingResource,
  Person,
  PersonPreviewList,
  PersonalProfileDocument,
  Resource,
  ResourceBrowserList,
]

export default function registerViews(lrs: LinkReduxLRSType) {
  return lrs.registerAll(...getViews().map(v => {
    return register(v)
  }));
}
