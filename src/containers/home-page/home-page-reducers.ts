import { LayoutModes } from '../../common/constants';
import { GraphNode } from '../../common/models';
import ACTION_TYPES from './home-page-action-types';
import { LayoutOptionsState, ItemsGraphState } from './home-page-state';
import { AnyAction } from 'redux';

export const keyDownInitState: number | null = null;

export const keyDownReducer = (state: number | null = keyDownInitState, action: AnyAction): number | null => {
  switch (action.type) {
    case ACTION_TYPES.SET_KEY_DOWN_INIT:
      return null;
    case ACTION_TYPES.SET_KEY_DOWN_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export const layoutOptionsInitState: LayoutOptionsState = {
  columnsNumber: 5,
  mode: LayoutModes.Extended
};

export const layoutOptionsReducer = (
  state: LayoutOptionsState = layoutOptionsInitState, action: AnyAction
  ): LayoutOptionsState => {
  switch (action.type) {
    case ACTION_TYPES.SET_LAYOUT_OPTIONS:
      return action.payload;
    default:
      return state;
  }
};

export const itemsGraphInitState: ItemsGraphState | GraphNode[] = [];

export const itemsGraphReducer = (
  state: ItemsGraphState | GraphNode[] = itemsGraphInitState, action: AnyAction
  ): ItemsGraphState | GraphNode[] => {
  switch (action.type) {
    case ACTION_TYPES.SET_ITEMS_GRAPH:
      return action.payload;
    default:
      return state;
  }
};
