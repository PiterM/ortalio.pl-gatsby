import * as React from 'react';
import { useDispatch } from 'react-redux';
import Link from 'gatsby-link';
import Img from "gatsby-image";
import styled from "@emotion/styled";
import styles from 'gatsby-plugin-theme-ui';
import { playPauseTrack } from '../player/player-actions';
import { TrackPlayStatus } from './track-models';
import PlayPauseButtonLayer from '../../components/play-button-layer';
const { colors, trackCardSize } = styles;

interface SquareImageProps {
    addedToCart?: boolean;
    maxWidth: number;
    maxHeight: number;
}
  
const SquareImage = styled(Img)((props: SquareImageProps) => {
  const { addedToCart, maxWidth, maxHeight } = props;
  const borderColor = addedToCart ? colors.cartButton : colors.grey;

  return {
    maxHeight,
    maxWidth,
    border: `3px solid ${borderColor}`,
    opacity: 1,
    transition: 'all 0.5s ease',
    cursor: 'pointer'
  };
});

const ImageContainer = styled.div({
  position: 'relative',
  width: '100%',
  height: '100%'
});

interface CartButtonProps {
  addedToCart?: boolean;
  isTrackButton: boolean;
}

const CartButton = styled.div((props: CartButtonProps) => {
  const { addedToCart, isTrackButton } = props;
  const backgroundColor = addedToCart ? colors.cartButton : colors.neutral;
  const borderColor = addedToCart ? colors.cartButton : colors.neutral;
  const position = isTrackButton ? 'absolute': 'static';

  return {
    background: `${backgroundColor} url("/images/shopping-cart.svg") center center no-repeat`,
    border: `2px solid ${borderColor}`,
    backgroundSize: '70% 70%',
    bottom: 0,
    right: -2,
    width: '70px',
    height: '70px',
    transition: 'all 0.05s ease',
    position,
    cursor: 'pointer',
    ":active": {
      backgroundSize: '50% 50%',
      borderColor: '#000'
    }
  }
});

const StyledLink = styled(Link)({
  width: '100%',
  height: '100%',
});

const StyledDiv = styled.div({
  width: '100%',
  height: '100%'
});

interface StyledContainerProps {
  isTrackPage: boolean;
}

const StyledContainer = styled.div(({ isTrackPage }: StyledContainerProps) => {
  const maxWidth = isTrackPage ? undefined : 288;
  const maxHeight = isTrackPage ? undefined : 288;

  return {
    backgroundImage: "none",
    textDecoration: 'none',
    position: 'relative',
    transition: 'all 0.5s ease',
    maxWidth,
    maxHeight,
    ":hover picture": {
      opacity: 0.7,
    },
    ":hover .gatsby-image-wrapper, :active .gatsby-image-wrapper": {
      borderColor: '#000'
    },
    ":active picture": {
      opacity: 0.5
    },
    "picture": {
      transition: 'all 0.5s ease',
    }
  }
});

interface TrackAddedCartButtonProps {
    uniqueId: string;
    isTrackButton: boolean;
}

export const TrackAddedCartButton: React.FC<TrackAddedCartButtonProps> = ({ uniqueId, isTrackButton }) => {
    const removeItemFromCart = async (e: any, uniqueId: any) => {
        const { Snipcart }: any = window;
        if (!Snipcart) return;
    
        e.preventDefault();
        try {
          uniqueId && await Snipcart.api.cart.items.remove(uniqueId);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <CartButton 
            onClick={(e) => removeItemFromCart(e, uniqueId)}
            addedToCart={true} 
            isTrackButton={isTrackButton}
        />
    );
};

interface TrackNotAddedCartButtonProps {
    sourceUrl: string;
    id: string;
    title: string;
    description: string;
    digitalItemGuid: string;
    price: number;
    url: string;
    isTrackButton: boolean;
}

export const TrackNotAddedCartButton: React.FC<TrackNotAddedCartButtonProps> = ({
  sourceUrl, id, title, description, digitalItemGuid, price, url, isTrackButton
}) => {
    return (
        <CartButton 
            onClick={(e) => e.preventDefault()}
            isTrackButton={isTrackButton}
            className="snipcart-add-item"
            data-item-id={id}
            data-item-price={price}
            data-item-url={url}
            data-item-description={description}
            data-item-image={sourceUrl}
            data-item-name={title}
            data-item-file-guid={digitalItemGuid}
        />
    );
};

interface TrackImageProps {
  fixed: any; 
  addedToCart: boolean;
  size: number;
}

const TrackImage: React.FC<TrackImageProps> = ({ fixed, addedToCart, size }) => {
  return (
    <ImageContainer>
      <SquareImage 
        fixed={fixed} 
        addedToCart={addedToCart} 
        maxWidth={size}
        maxHeight={size}
      />
    </ImageContainer>
  );
};

interface TrackTitleProps {
  addedToCart: boolean;
}

const TrackTitle = styled.div(({ addedToCart }: TrackTitleProps) => {
  const priceLabelColor = addedToCart ? colors.cartButton : 'rgba(255, 255, 255, 0.75)';
  return {
    position: 'absolute',
    width: '100%',
    top: '50%',
    transform: 'translate(0, -50%)',
    left: 0,
    "& > p": {
      textAlign: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.75)',
      fontSize: 36
    },
    "& > p:nth-of-type(2)": {
      backgroundColor: priceLabelColor,
      fontSize: 24,
      fontWeight: 900
    }
  }
});

interface TrackCoverProps {
    id: string;
    addedToCart?: boolean;
    fixed: any;
    url: string;
    trackStatus: TrackPlayStatus;
    isTrackPage?: boolean;
    shortTitle: string;
    isFree: boolean;
    price: number;
}

export const TrackCover: React.FC<TrackCoverProps> = (
    { id, addedToCart, fixed, url, trackStatus, isTrackPage, shortTitle, isFree, price }
  ) => {
  const dispatch = useDispatch();
  const size = isTrackPage ? trackCardSize.alone : trackCardSize.inGrid;
  const priceLabel = isFree ? 'FREE BEAT' : `$${price}`;

  return (
      <>
        <StyledContainer
          isTrackPage={isTrackPage}
        >
          { isTrackPage 
            ? 
              <StyledDiv>
                <TrackImage fixed={fixed} addedToCart={addedToCart} size={size} />
              </StyledDiv>
            : 
              <StyledLink to={url}>
                <TrackImage fixed={fixed} addedToCart={addedToCart} size={size} />
              </StyledLink>
          }
          <TrackTitle
            addedToCart={addedToCart}
          >
            <p>{shortTitle}</p>
            <p>{priceLabel}</p>
          </TrackTitle>
        </StyledContainer>
        <PlayPauseButtonLayer 
          onClick={() => trackStatus !== TrackPlayStatus.Loading && dispatch(playPauseTrack(id))}
          trackStatus={trackStatus}
        />
      </>
  );
};