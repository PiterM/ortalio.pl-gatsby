// import { AnyAction } from 'redux';
import ACTION_TYPE from './home-page-action-types';
import { LayoutOptionsState, ItemsGraphState } from './home-page-state';

export interface SetKeyDownInitAction {
  payload: number;
  type: ACTION_TYPE.SET_KEY_DOWN_INIT;
}

export const setKeyDownInitAction = (payload: number): SetKeyDownInitAction => ({
  payload,
  type: ACTION_TYPE.SET_KEY_DOWN_INIT
});

export interface SetKeyDownSuccessAction {
  payload: number;
  type: ACTION_TYPE.SET_KEY_DOWN_SUCCESS;
}

export const setKeyDownSuccessAction = (payload: number): SetKeyDownSuccessAction => ({
  payload,
  type: ACTION_TYPE.SET_KEY_DOWN_SUCCESS
});

export interface SetLayoutOptionsAction {
  payload: LayoutOptionsState;
  type: ACTION_TYPE.SET_LAYOUT_OPTIONS;
}

export const setLayoutOptionsAction = (payload: LayoutOptionsState): SetLayoutOptionsAction => ({
  payload,
  type: ACTION_TYPE.SET_LAYOUT_OPTIONS
});

export interface SetItemsGraphAction {
  payload: ItemsGraphState;
  type: ACTION_TYPE.SET_ITEMS_GRAPH;
}

export const setItemsGraphAction = (payload: ItemsGraphState): SetItemsGraphAction => ({
  payload,
  type: ACTION_TYPE.SET_ITEMS_GRAPH
});

export type HomePageActions =
  | SetKeyDownInitAction
  | SetKeyDownSuccessAction
  | SetLayoutOptionsAction
  | SetItemsGraphAction;