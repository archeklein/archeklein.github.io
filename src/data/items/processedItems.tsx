import { Items, Category } from './items'
import data from './items.json'

export const allItems: Items[] = Object.keys(data).map(
    (key) => (data as any)[key] as Items
)

export const housewares: Items[] = allItems.filter(
    (item: Items) => item.sourceSheet === Category.Housewares
)
