import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { dimensions } from '../../common/variables';
import { SocialMediaData, MetaData } from './home-page.models';
import { KeyCodes } from '../../common/constants';
import { getTracks } from '../player/player-selectors';
import { 
    getLayoutColumnsNumber, 
    getLayoutMode,
} from './home-page-selectors';
import { 
    setKeyDownInit, 
    setScreenParams
} from './home-page-actions';
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
};

const initKeyPressed = false;

const HomePage: React.FC<HomePageProps> = ({ 
    siteMetadata, 
    socialMediaData,
}) => {
    const dispatch = useDispatch();

    const [keyPressed, setKeyPressed] = useState(initKeyPressed);

    const tracks = useSelector(getTracks);
    const columnsNumber = useSelector(getLayoutColumnsNumber);
    const mode = useSelector(getLayoutMode);

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("keyup", onKeyUp);
        typeof window !== 'undefined' && window.addEventListener("resize", onWindowResize);
        dispatch(setScreenParams());
        
        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('keyup', onKeyUp);
            typeof window !== 'undefined' && window.removeEventListener('resize', onWindowResize);
        }
    }, []);

    const isHandledKey = (keyCode: number) => Object.values(KeyCodes).includes(keyCode);

    const onKeyDown = (event: any) => { 
        isHandledKey(event.keyCode) && event.preventDefault();
        !keyPressed && (setKeyPressed(true), dispatch(setKeyDownInit(event.keyCode)));
    }

    const onKeyUp = (event: any) => { 
        isHandledKey(event.keyCode) && event.preventDefault();
        keyPressed && setKeyPressed(false);
    }

    const onWindowResize = () => dispatch(setScreenParams());

    const noTracks = !tracks || tracks.length === 0;

    return (
        <HomePageLayout
            siteMetadata={siteMetadata}
            className={`layout-${mode} columns${columnsNumber}`}
        >
            <SocialIcons
                socialMediaData={socialMediaData}
            />
            <ListenHeader>Click to play:</ListenHeader>

            { noTracks 
                ?   <NoTracksInfo>Sorry. No content here yet.</NoTracksInfo>
                :   <>
                    <StyledPage 
                        id="main-grid"
                    >
                        <Tracks 
                            tracks={tracks} 
                            columnsNumber={columnsNumber}
                        /> 
                    </StyledPage>
                    <Footer />
                    </>
            }
        </HomePageLayout>
    );
};

export default HomePage;