import { GraphNode, ScreenData } from '../common/models';
import { LayoutModes } from '../common/constants';
import { PlayerState } from '../containers/player/player-state';

export interface StoreState {
    player: PlayerState;
    errorMessage: string | null;
    keyDownCode: number | null;
    layoutOptions: LayoutOptionsState;
    itemsGraph: ItemsGraphState | GraphNode[];
}

export interface LayoutOptionsState {
    columnsNumber: number;
    mode: LayoutModes;
    screen: ScreenData;
}

export interface ItemsGraphState {
    [key: string]: GraphNode;
}