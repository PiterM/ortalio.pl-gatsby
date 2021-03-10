import { GraphNode, ScreenParameters } from '../common/models';
import { PlayerState } from '../containers/player/player-state';

export interface StoreState {
    player: PlayerState;
    errorMessage: string | null;
    keyDownCode: number | null;
    screen: ScreenParameters;
    itemsGraph: ItemsGraphState | GraphNode[];
}

export interface ItemsGraphState {
    [key: string]: GraphNode;
}