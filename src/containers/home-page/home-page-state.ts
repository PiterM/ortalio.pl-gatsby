import { LayoutModes } from '../../common/constants';
import { GraphNode } from '../../common/models';

export interface LayoutOptionsState {
  columnsNumber: number;
  mode: LayoutModes;
}

export interface ItemsGraphState {
  [key: string]: GraphNode;
}