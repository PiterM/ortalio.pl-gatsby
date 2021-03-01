import { PlayerState } from '../containers/player/player-state';
import { LayoutOptionsState, ItemsGraphState } from '../containers/home-page/home-page-state';
import { GraphNode } from '../common/models';
// import { CartState } from '../containers/cart/cart-state';
// import { GlobalState } from '../common/models';

export interface StoreState {
    player: PlayerState;
    keyDownCode: number | null;
    layoutOptions: LayoutOptionsState;
    itemsGraph: ItemsGraphState | GraphNode[];
    // cart: CartState;
    // global: GlobalState;
}