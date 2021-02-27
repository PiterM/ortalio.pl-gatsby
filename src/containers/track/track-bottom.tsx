import * as React from 'react';
import styled from "@emotion/styled";
import { Link } from 'gatsby';
import styles from '../../gatsby-plugin-theme-ui';
const { colors } = styles;

const TrackLinkWrapper = styled.div({
    transition: 'all 0.2s ease',
    position: 'relative',
    border: '2px solid transparent',
    borderTop: 'none',
    height: '3.5em',
    marginBottom: '1em',
    ":hover, :active": {
        borderColor: colors.cartButton,
    },
    ":hover a, :active a": {
        color: colors.trackTitle,
    },
});

const TrackLink = styled(Link)({
    padding: '5px 10px',
    color: '#000',
    borderBottom: '1px solid transparent',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    position: 'absolute',
    ":hover, :active": {
        color: colors.trackTitle,
    },
  });

export interface TrackProps {
    url: string;
    title: string;
}
  
const TrackBottom: React.FC<TrackProps> = ({ url, title }: TrackProps) => {
    return (
        <TrackLinkWrapper>
            <TrackLink to={url}>{title}</TrackLink>
        </TrackLinkWrapper>
    );
};

export default TrackBottom;