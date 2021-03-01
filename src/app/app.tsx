import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTracks } from '../containers/player/player-selectors';
import { isObjectEmpty } from '../common/common-helpers';
import { setTracksData } from '../containers/player/player-actions';
import HomePage from '../containers/home-page/home-page';
const { useEffect } = React;

interface IndexPageProps {
  data: any;
}

const IndexPage: React.FC<IndexPageProps> = ({ pageContext: { data } }: any) => {
  const reduxTracks = useSelector(getTracks);
  const dispatch = useDispatch();

  useEffect(() => {
    isObjectEmpty(reduxTracks) && 
      data?.ortalioMedias?.edges?.length > 0 && 
      dispatch(setTracksData(data.ortalioMedias.edges));
  }, [dispatch]);

  return (
    <HomePage 
      siteMetadata={data?.ortalioSettingBy?.ortalioSettingsField}
      siteThumbnailData={data?.ortalioSettingBy?.featuredImage?.node}
      socialMediaData={data?.ortalioSocialMedias?.edges}
    />
  );
};

export default IndexPage;