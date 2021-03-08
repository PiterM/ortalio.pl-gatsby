import { StoreState } from '../../store/StoreState';

export const getItemsGraph = ({ itemsGraph }: StoreState) => itemsGraph;
export const getLayoutOptions = ({ layoutOptions }: StoreState) => layoutOptions;
export const getLayoutColumnsNumber = ({ layoutOptions }: StoreState) => layoutOptions.columnsNumber;