export interface FeaturedImage {
    altText: string;
    sourceUrl: string;
}

interface OrtalioMediaItem {
    id: string;
    title: string;
    slug: string;
    shortDescription: string;
    content?: string;
    soundcloudUrl: string;
    youtubeUrl?: string;
    featuredImage: FeaturedImage;
}

export interface OrtalioMedia { 
    node: OrtalioMediaItem;
}

interface MetaDataItem {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    siteTitle: string;
    siteIntro: string;
    siteDescription: string;
}

export type MetaData = MetaDataItem;

interface SocialMedia {
    url: string;
    imageAltText: string;
    imageSourceUrl: string;
}

export type SocialMediaData = SocialMedia;