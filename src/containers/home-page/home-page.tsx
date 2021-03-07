import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { dimensions } from '../../common/variables';
import { SocialMediaData, MetaData } from './home-page.models';
import { LayoutModes, KeyCodes } from '../../common/constants';
import { getCurrentTrack, getTracks } from '../player/player-selectors';
import { 
    getLayoutColumnsNumber, 
    getLayoutMode,
} from '../../common/common-helpers';
import { setKeyDownInit, setLayoutOptions as setLayoutOptionsAction } from './home-page-actions';
import HomePageLayout from '../../layouts/home-page-layout';
import SocialIcons from '../../components/social-icons/social-icons';
import Footer from '../../components/footer/footer';
import Tracks from '../tracks/tracks';
const { useEffect, useState } = React;

import './home-page.scss';

const StyledPage = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 2fr);
  text-align: center;
  padding-bottom: ${dimensions.mediaPlayerHeight.mini}px;
  margin-top: 50px;
`;

const ListenHeader = styled.p({
    display: 'inline-block',
    letterSpacing: '6px',
    fontFamily: '"Playfair Display", "Droid Serif", Georgia, "Times New Roman", Times, serif',
    fontWeight: 900,
    fontSize: '28px',
    textTransform: 'uppercase',
    textAlign: 'center',
    width: '100%',
    margin: '10px 0',
    color: '#2f2f2f'
});

const NoTracksInfo = styled.p({
    textAlign: 'center',
    width: '100%',
    marginTop: 100
});

interface HomePageProps {
    socialMediaData: SocialMediaData[];
    siteMetadata: MetaData;
    siteThumbnailData: any;
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

const HomePage: React.FC<HomePageProps> = ({ 
    siteMetadata, 
    socialMediaData,
    siteThumbnailData,
}) => {
    const dispatch = useDispatch();

    const [windowResolution, setWindowResolution] = useState(initWindowResolution);
    const [layoutOptions, setLayoutOptions] = useState(initLayoutOptions);
    const [keyPressed, setKeyPressed] = useState(initKeyPressed);

    const currentTrack = useSelector(getCurrentTrack);
    const tracks = useSelector(getTracks);

    const isHandledKey = (keyCode: number) => Object.values(KeyCodes).includes(keyCode);

    const onKeyDown = (event: any) => { 
        isHandledKey(event.keyCode) && event.preventDefault();
        !keyPressed && (setKeyPressed(true), dispatch(setKeyDownInit(event.keyCode)));
    }

    const onKeyUp = (event: any) => { 
        isHandledKey(event.keyCode) && event.preventDefault();
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
    const noTracks = !tracks || tracks.length === 0;
        
    return (
        <HomePageLayout
            siteMetadata={siteMetadata}
            siteThumbnailData={siteThumbnailData}
            className={`layout-${mode} columns${columnsNumber}`}
        >
            <SocialIcons
                socialMediaData={socialMediaData}
            />
            <ListenHeader>Click to play:</ListenHeader>

            { noTracks 
                ?   <NoTracksInfo>Sorry. No content here yet.</NoTracksInfo>
                :   <StyledPage 
                        id="main-grid"
                    >
                        <Tracks 
                            tracks={tracks} 
                            columnsNumber={columnsNumber}
                        /> 
                    </StyledPage>
            }
            <Footer />
        </HomePageLayout>
    );
};

export default HomePage;