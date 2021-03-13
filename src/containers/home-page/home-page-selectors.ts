import { StoreState } from '../../store/StoreState';
import { dimensions } from '../../common/variables'
import { LayoutModes } from '../../common/constants';

export const getItemsGraph = ({ itemsGraph }: StoreState) => itemsGraph;
export const getLayoutOptions = ({ screen }: StoreState) => screen;

export const getLayoutScreenData = ({ screen }: StoreState) => {
    return screen && screen[screen?.orientation];
};

export const getLayoutColumnsNumber = ({ screen }: StoreState) => {
    const resolution = screen && screen[screen?.orientation];
   
    if (!resolution || !resolution.height || !resolution.width) {
        return dimensions.homePage.columnsNumber;
    }

    if (resolution.width <= 600) {
        return 1;
    } else if (resolution.width <= 768) {
        return 2;
    } else if (resolution.width <= 960) {
        return dimensions.homePage.columnsNumber - 2;
    } else if (resolution.width <= 1280) {
        return dimensions.homePage.columnsNumber - 1;
    }
    
    return dimensions.homePage.columnsNumber;
}

export const getLayoutMode = ({ screen }: StoreState) => {
    const resolution = screen && screen[screen?.orientation];

    if (!resolution || !resolution.height || !resolution.width) {
        return LayoutModes.Mobile;
    }

    if (resolution.width <= 600) {
        return LayoutModes.Mobile;
    } else if (resolution.width <= 1024) {
        return LayoutModes.Compact;
    }
    return LayoutModes.Extended;
}