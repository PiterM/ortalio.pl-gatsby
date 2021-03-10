import { PlayerState } from '../containers/player/player-state';
import { ItemsGraphState } from '../containers/home-page/home-page-state';
import { GraphNode, ScreenParameters } from '../common/models';

export interface StoreState {
    player: PlayerState;
    keyDownCode: number | null;
    screen: ScreenParameters;
    itemsGraph: ItemsGraphState | GraphNode[];
}