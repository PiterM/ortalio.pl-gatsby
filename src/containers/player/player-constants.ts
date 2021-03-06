export enum LoopMode {
    Off = 'Off',
    LoopAll = 'LoopAll',
    LoopOne = 'LoopOne'
};

export enum NextPreviousTrackMode {
    Next = 'Next',
    Previous = 'Previous'
};

export enum AudioSource {
    Soundcloud = 'Soundcloud',
    Youtube = 'Youtube'
}

export enum TimerMode {
    ElapsedTime = 'ElapsedTime',
    RemainingTime = 'RemainingTime'
}

export enum ArrowKeyDirection {
    Right = 'Right',
    Left = 'Left',
    Up = 'Up',
    Down = 'Down'
}

export const soundcloudConfig = {
    options: {
        single_active: true,
        liking: true,
        sharing: true,
        download: true,
        show_artwork: true,
        show_comments: true,
        show_playcount: true,
        show_user: true,
        visual: false,
        hide_related: true
    }
}

export const youtubeConfig = {
    playerVars: {
        fs: 1,
        controls: 1,
    }
}

export const playerVisibleHeight = {
    soundcloudPlayerHeight: 162,
    youtubePlayerHeight: 400
};