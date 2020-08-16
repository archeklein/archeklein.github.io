import * as React from 'react';
import { Items } from '../data';
import data from '../data/items.json';
import { capitalize } from '../utils';

export const renderItems = (item: Items) => {
    return <div>{capitalize(item.name)}</div>;
}

export const ItemList = () => {
    const items = Object.keys(data).map((key) => (data as any)[key] as Items);
    return <div>{items.map(item => renderItems(item))}</div>;
}