import { FeaturedImage } from '../home-page/home-page.models';

export interface TrackState {
    id: string;
    slug: string;
    soundcloudUrl: string;
    youtubeUrl?: string;
    title: string;
    shortDescription: string;
    content?: string;
    order: number;
    isPlaying: boolean;
    featuredImage: FeaturedImage;
}
  