import * as React from "react";
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { colors } from '../../common/variables';
import { TrackState } from '../track/track-state';
import { ItemsGraphState } from '../home-page/home-page-state';
import { 
  getItemsGraph,
  getRandomNumberFromString,
  isObjectEmpty
} from '../../common/common-helpers';
import { setItemsGraphAction } from '../home-page/home-page-actions';
import Track from '../track/track';

const StyledPageColumn = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    flex-direction: column;
    width: auto;

    & + & {
        border-left: 1px solid ${colors.newspaperText};
    }
`;

export interface TracksProps {
  tracks: any[];
  columnsNumber: number;
}

const Tracks: React.FC<TracksProps> = ({ tracks, columnsNumber }) => {
    const dispatch = useDispatch();

    const renderTrack = (item: TrackState) => {
      const { id, title, slug, shortDescription, content } = item;
      return (
          <Track
              key={id}
              id={id}
              slug={slug}
              index={getRandomNumberFromString(id)}
              title={title}
              shortDescription={shortDescription}
              content={content}
          />
      );
    }

    const renderTracksColumn = (columnItems: any[]): any[] => {
        return columnItems.map((item) => renderTrack(item));
    };

    const renderTracks = (items: any[]) => {
      if (isObjectEmpty(items)) {
        return null;
      }

      items = Object.values(items);

      const rowsNumber = Math.floor(items.length / columnsNumber) + 1;
      let result: any[] = [];
      let columns: any[] = [];

      for (let j=0; j<columnsNumber; j++) {
          let columnIndices: number[] = [];
          for (let i=0; i<rowsNumber; i++) {
              if (items[j + i * columnsNumber] !== undefined) {
                  columnIndices.push(j + i * columnsNumber);
              }
          }

          columns.push(columnIndices);

          const columnItems: any[] = items.filter((item, index) => columnIndices.indexOf(index) !== -1)
          const columnItemsResult = (
              <StyledPageColumn 
                  key={columnIndices.reduce((a: number, b: number) => a * b)} 
                  className="grid-flex"
              >
                  {renderTracksColumn(columnItems)}
              </StyledPageColumn>
          );
          result = result.concat(columnItemsResult);
          columnIndices = [];
      }

      dispatch(setItemsGraphAction(getItemsGraph(columns) as ItemsGraphState));
      return result;
    } 

    return (<>{renderTracks(tracks)}</>);
};

export default Tracks;
