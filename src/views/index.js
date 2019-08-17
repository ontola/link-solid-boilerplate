import ErrorResource from './ErrorResource'
import Person from './foaf/Person'
import PersonalProfileDocument from './foaf/PersonalProfileDocument'
import PersonPreviewList from './foaf/PersonPreviewList'
import Container from './ldp/Container'
import Dates from './Literal/Dates'
import LoadingResource from './LoadingResource'
import Resource from './rdfsResource/Resource'
import ResourceBrowserList from './rdfsResource/ResourceBrowserList'

export default [
  ...Container,
  ...Dates,
  ...ErrorResource,
  ...LoadingResource,
  ...Person,
  ...PersonPreviewList,
  ...PersonalProfileDocument,
  ...Resource,
  ...ResourceBrowserList,
]
