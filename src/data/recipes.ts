import { Version, Category } from './items/items';

export interface Recipes {
  sourceSheet: SourceSheet;
  name: string;
  buy: number;
  sell: number;
  milesPrice: number | null;
  source: string[];
  sourceNotes: null | string;
  versionAdded: Version;
  versionUnlocked: Version;
  recipesToUnlock: number;
  category: Category;
  craftedItemInternalId: number;
  cardColor: CardColor | null;
  serialId: number;
  internalId: number;
  uniqueEntryId: string;
  materials: {[key: string]: number};
}

export enum CardColor {
  Beige = 'beige',
  Blue = 'blue',
  Brick = 'brick',
  Brown = 'brown',
  DarkGray = 'dark gray',
  Gold = 'gold',
  Green = 'green',
  LightGray = 'light gray',
  Orange = 'orange',
  Pink = 'pink',
  Red = 'red',
  Silver = 'silver',
  White = 'white',
  Yellow = 'yellow',
}

export enum SourceSheet {
  Recipes = 'Recipes',
}