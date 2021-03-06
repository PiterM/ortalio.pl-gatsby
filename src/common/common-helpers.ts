import { GraphNode } from './models';
import { ItemsGraphState } from '../store/StoreState';

export const getItemsGraph = (columns: any[]): ItemsGraphState | GraphNode[] => {
    let graph: ItemsGraphState | GraphNode[] = [];
    for (let i = 0; i < columns.length; i++) {
        for (let j = 0; j < columns[i].length; j++) {
            const columnRightKey = i + 1 >= columns.length
                ? 0 
                : i + 1;
            let rowRightKey = columnRightKey === 0
                ? j + 1
                : j;

            const columnLeftKey = i - 1 < 0 
                ? columns.length - 1 
                : i - 1;
            
            let rowLeftKey = columnLeftKey === columns.length - 1
                ? j - 1
                : j;

            const itemDownKey = j + 1 >= columns[i].length
                ? 0
                : j + 1;

            const itemUpKey = j - 1 < 0
                ? columns[i].length - 1
                : j - 1;

            const itemRight = columns[columnRightKey][rowRightKey] === undefined
                ? columns[columnRightKey][columns[columnRightKey].length - 1]
                : columns[columnRightKey][rowRightKey];

            const itemLeft = columns[columnLeftKey][rowLeftKey] === undefined
                ? columns[columnLeftKey][columns[columnLeftKey].length - 1]
                : columns[columnLeftKey][rowLeftKey];

            const graphNode: GraphNode = {
                Right: itemRight,
                Left: itemLeft,
                Up: columns[i][itemUpKey],
                Down: columns[i][itemDownKey]
            };

            graph[columns[i][j]] = graphNode;
        }
    }

    return graph;
}

export const getRandomNumberFromString = (text: string) => {
    let index = 0;
    for (let i=0; i<text.length; i++) {
        index += text.charCodeAt(i) * (Math.floor(Math.random() * 10) + 1)
    }
    return index;
}

export const isObjectEmpty = (obj: any) => Object.keys(obj).length === 0 && obj.constructor === Object;

const pad = (n: number, length: number) => {
    let str = '' + n;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
};

export const timeFormatHelper = (inputSeconds: number) => {
    const minutes = Math.floor(inputSeconds / 60);
    const seconds = inputSeconds % 60;
    return `${pad(minutes, 2)}:${pad(seconds, 2)}`;
};

export const setWindowLocationHash = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) element.scrollIntoView();
};