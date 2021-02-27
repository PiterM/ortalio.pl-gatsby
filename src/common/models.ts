export interface WindowResolution {
    width: number;
    height: number;
}
export interface GraphNode {
    left: number;
    right: number;
    up: number;
    down: number;
}

interface SocialMedia {
    url: string;
    imageAltText: string;
    imageSourceUrl: string;
}

export type SocialMediaData = SocialMedia;