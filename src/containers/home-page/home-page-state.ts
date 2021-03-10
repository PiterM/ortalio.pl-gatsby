import { LayoutModes } from '../../common/constants';
import { GraphNode, ScreenData } from '../../common/models';

export interface LayoutOptionsState {
  columnsNumber: number;
  mode: LayoutModes;
  screen?: ScreenData;
}

export interface ItemsGraphState {
  [key: string]: GraphNode;
}