import * as React from "react";
import { useSelector } from 'react-redux';
import styled from "@emotion/styled";
import { getCartItems } from '../cart/cart-selectors';
import { getCurrentTrack } from '../player/player-selectors';
import { TrackCover } from "./track-details";
import CartButton from '../../components/cart-button';
import { TrackPlayStatus } from './track-models';
import TrackBottom from './track-bottom';

interface SquareLayerProps {
  isTrackPage?: boolean;
}

const SquareLayer = styled.div((props: SquareLayerProps) => {
  const position = props.isTrackPage ? 'static' : 'relative';
  return {
    position,
    transition: 'all 0.5s ease',
    opacity: 1,
}});

export interface TrackProps {
  track: any;
  key?: number;
  items: any;
  currentTrack: any;
  isTrackPage?: boolean;
}

export const TrackCard: React.FC<TrackProps> = ({ track, items, currentTrack, isTrackPage }) => {
  const { id } = track?.node;
  const { shortTitle, title, description, digitalItemGuid, price, url, free } = track?.node?.ortalioMusicTrack;
  const { imageFile: { childImageSharp: { fixed }} } = track?.node?.ortalioMusicTrack?.coverImage;
  const thumbnailSourceUrl = track?.node?.ortalioMusicTrack?.thumbnailImage?.sourceUrl;
  const trackIsAdded = items && items[id] !== undefined;
  const storeItem = trackIsAdded && items[id];
  const status = currentTrack && currentTrack.details.id === id ? currentTrack.status : TrackPlayStatus.None;

  return (
      <div>
        <SquareLayer isTrackPage={isTrackPage} >
          <TrackCover 
            id={id}
            fixed={fixed} 
            addedToCart={trackIsAdded} 
            url={url}
            trackStatus={status}
            isTrackPage={isTrackPage}
            shortTitle={shortTitle}
            isFree={free}
            price={price}
          />
          <CartButton 
            trackIsAdded={trackIsAdded}
            uniqueId={storeItem && storeItem.uniqueId ? storeItem.uniqueId: ''}
            id={id}
            shortTitle={shortTitle}
            title={title}
            description={description}
            sourceUrl={thumbnailSourceUrl}
            digitalItemGuid={digitalItemGuid}
            free={free}
            price={price}
            url={url}
            isTrackButton={true}
          />
        </SquareLayer>
        { !isTrackPage && <TrackBottom title={title} url={url} /> }
      </div>
  );
}

const Card = styled.div({
  minWidth: 400,
  minHeight: 400,
  "@media (max-width:960px)": {
    minWidth: "100vw"
  },
});

export interface TrackContainerProps {
    track: any;
}

const TrackCardContainer: React.FC<TrackContainerProps> = ({ track }) => {
  const items = useSelector(getCartItems);
  const currentTrack = useSelector(getCurrentTrack);

  return (
    <Card>
      <TrackCard 
        track={track}
        items={items}
        currentTrack={currentTrack}
        isTrackPage={true}
      />
    </Card>
  );
}

export default TrackCardContainer;
