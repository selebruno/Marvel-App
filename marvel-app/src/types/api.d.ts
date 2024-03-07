
interface Summary {
resourceURI?: string;
name?:string;
type?: string;
}


interface ItemList {
available?:number;
returned?: number;
collectionURI?: string;
items?:Summary[]
}

interface Url {
type?: string;
url?: string;
}

interface Image {
path?: string;
extension?: string;
}


interface Character {
id?: number;
name?: string;
description?:string;
modified?: string;
resourceURI?: string;
urls?: Url[];
thumbnail?: Image;
comics ?: ItemList;
stories?: ItemList;
events?: ItemList;
series?: ItemList;
}

interface BaseDataWrapper{
code?: number;
status?:string;
copyright?: string;
attributionText?:string;
attributionHTML?: string;
etag?: string;  
}

interface BaseDataContainer {
offset?:number;
limit?:number;
total?: number;
count?: number;    
}

interface CharactersDataContainer extends BaseDataContainer {
results?: Character[];
}

interface CharactersDataWrapper extends BaseDataWrapper {
data?: CharactersDataContainer;
}


interface CharacterDataContainer extends BaseDataContainer {
results?: Character[];
}

interface CharacterDataWrapper extends BaseDataWrapper {
data?: CharacterDataContainer;
}

interface TextObject {
  type?: string;
  language?: string;
  text?: string;
}

interface ComicDate {
  type?: string;
  date?: Date;
}

interface ComicPrice {
  type?: string;
  price?: number;
}


interface Comic {
  id?: number;
  digitalId?: number;
  title?: string;
  issueNumber?: number;
  variantDescription?: string;
  description?: string;
  modified?: Date;
  isbn?: string;
  upc?: string;
  diamondCode?: string;
  ean?: string;
  issn?: string;
  format?: string;
  pageCount?: number;
  textObjects?: TextObject[];
  resourceURI?: string;
  urls?: Url[];
  series?: Summary;
  variants?: Summary[];
  collections?: Summary[];
  collectedIssues?: Summary[];
  dates?: ComicDate[];
  prices?: ComicPrice[];
  thumbnail?: Image;
  images?: Image[];
  creators?: ItemList;
  characters?: ItemList;
  stories?: ItemList;
  events?: ItemList;
}


interface ComicDataContainer extends BaseDataContainer {
results?: Comic[];
}

interface ComicDataWrapper extends BaseDataWrapper {
data?:ComicDataContainer;
}

