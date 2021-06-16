export interface ISong {
    id: string
    artist_name: string
    bpm: number
    comments: number
    description?: string
    name: string
    name_seo: string
    song_genres: ISongGenre[]
    music_file_mimetype: string
    music_file_path: string
    cover_image_path: string
    plays: number
}

export interface IArtist {
    id: string
    artist_name: string
    cover_image_path: string
    favorites: number
    followers: number
    liked: number
    name: string
    releases: number
}

export interface ISongGenre {
    id: string
    name: string
}

export interface ISongItemProps extends ISong {
    index: number
    onLikeSong: (id: string) => void
    onDislikeSong: (id: string) => void
    isLiked: boolean
    currentlyPlayedSong: string | null
    setCurrentlyPlayedSong: (id: string) => void
}