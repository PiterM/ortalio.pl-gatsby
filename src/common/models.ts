import { WindowOrientation } from './constants';

export interface WindowResolution {
    width: number;
    height: number;
}
export interface GraphNode {
    Left: number;
    Right: number;
    Up: number;
    Down: number;
}

interface SocialMedia {
    ortalioSocialMediaField: any;
    featuredImage: any;
}

export type SocialMediaData = SocialMedia;

export interface ScreenResolution {
    width: number;
    height: number;
}

export interface ScreenParameters {
    [key: number]: ScreenResolution;
    orientation: number;
}