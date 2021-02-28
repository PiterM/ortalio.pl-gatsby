import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SocialMediaData, GlobalData } from './home-page.models';
import { LayoutModes, KeyCodes } from '../../common/constants';
import { getCurrentTrack } from '../player/player-selectors';
import { 
    getLayoutColumnsNumber, 
    getLayoutMode,
    getItemsGraph,
} from '../../common/common-helpers';
import { setKeyDownInitAction, setLayoutOptionsAction } from './home-page-actions';
import HomePageLayout from '../../layouts/home-page-layout';
const { useEffect, useState } = React;

interface HomePageProps {
    socialMediaData: SocialMediaData[];
    globalData: GlobalData;
};

const initWindowResolution = {
    width: window.innerWidth,
    height: window.innerHeight
};

const initLayoutOptions = {
    columnsNumber: 5,
    mode: LayoutModes.Extended,
};

const initKeyPressed = false;

const HomePage: React.FC<HomePageProps> = ({ globalData, socialMediaData }) => {
    const dispatch = useDispatch();

    const [windowResolution, setWindowResolution] = useState(initWindowResolution);
    const [layoutOptions, setLayoutOptions] = useState(initLayoutOptions);
    const [keyPressed, setKeyPressed] = useState(initKeyPressed);

    const currentTrack = useSelector(getCurrentTrack);

    const onKeyDown = (event: any) => { 
        if (currentTrack?.details.id && Object.values(KeyCodes).includes(event.keyCode)) {
            event.preventDefault();
        }
        if (!keyPressed) {
            dispatch(setKeyDownInitAction(event.keyCode));
            setKeyPressed(true);
        }
    }

    const onKeyUp = () => { 
        keyPressed && setKeyPressed(false);
    }

    const onWindowResize = () => {
        const windowResolution = {
            width: window.innerWidth,
            height: window.innerHeight
        };
        const columnsNumber = getLayoutColumnsNumber(windowResolution);
        const mode = getLayoutMode(windowResolution);

        setWindowResolution(windowResolution);
        setLayoutOptions({ columnsNumber, mode });
        dispatch(setLayoutOptionsAction({ columnsNumber, mode }));
    }

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("keyup", onKeyUp);
        window.addEventListener("resize", onWindowResize)
        onWindowResize();
        
        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('keyup', onKeyUp);
            window.removeEventListener('resize', onWindowResize);
        }
    }, []);

    const { mode, columnsNumber} = layoutOptions;
        
    return (
        <HomePageLayout
            globalData={globalData}
            className={`layout-${mode} columns${columnsNumber}`}
        >
            <h1>HomePage</h1>
        </HomePageLayout>
    );
};

export default HomePage;