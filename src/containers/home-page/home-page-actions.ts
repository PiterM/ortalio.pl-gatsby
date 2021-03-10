import ACTION_TYPE from './home-page-action-types';
import { LayoutOptionsState, ItemsGraphState } from './home-page-state';

export interface SetKeyDownInit {
  payload: number;
  type: ACTION_TYPE.SET_KEY_DOWN_INIT;
}

export const setKeyDownInit = (payload: number): SetKeyDownInit => ({
  payload,
  type: ACTION_TYPE.SET_KEY_DOWN_INIT
});

export interface SetKeyDownSuccess {
  payload: number;
  type: ACTION_TYPE.SET_KEY_DOWN_SUCCESS;
}

export const setKeyDownSuccess = (payload: number): SetKeyDownSuccess => ({
  payload,
  type: ACTION_TYPE.SET_KEY_DOWN_SUCCESS
});

export interface SetLayoutOptions {
  payload: LayoutOptionsState;
  type: ACTION_TYPE.SET_LAYOUT_OPTIONS;
}

export const setLayoutOptions = (payload: LayoutOptionsState): SetLayoutOptions => ({
  payload,
  type: ACTION_TYPE.SET_LAYOUT_OPTIONS
});

export interface SetItemsGraph {
  payload: ItemsGraphState;
  type: ACTION_TYPE.SET_ITEMS_GRAPH;
}

export const setItemsGraph = (payload: ItemsGraphState): SetItemsGraph => ({
  payload,
  type: ACTION_TYPE.SET_ITEMS_GRAPH
});

export interface SetScreenData {
  type: ACTION_TYPE.SET_SCREEN_DATA;
}

export const setScreenData = (): SetScreenData => ({
  type: ACTION_TYPE.SET_SCREEN_DATA
});

export type HomePageActions =
  | SetKeyDownInit
  | SetKeyDownSuccess
  | SetLayoutOptions
  | SetItemsGraph
  | SetScreenData;