import { fireEvent, render, screen } from '@testing-library/react'
import SongItem from './SongItem'

jest.mock('use-http')
jest.mock('react-truncate', () => {
  return {
    __esModule: true,
    A: true,
    default: ({ children }: { children: any }) => {
      return <p>{ children }</p>
    },
  };
})

jest
.spyOn(window.HTMLMediaElement.prototype, 'load')
.mockImplementation(() => {})

describe('SongItem', () => {
  it('renders SongItem with correct information', () => {
    const songData = {
      id: '1',
      name: 'Song-1',
      artist_name: 'Artist-1',
      cover_image_path: 'https://cover-image.com/1.jpg',
      music_file_path: 'https://dz2l6nhikl0ua.cloudfront.net/assets/music_file/3f28ee9e-71f0-11eb-8a0d-022ed69f96e6.m4a?cb=20210218145023',
      bpm: 128,
      comments: 0,
      music_file_mimetype: 'audio/mp4',
      song_genres: [
        {
          id: '1',
          name: 'genre-1'
        },
        {
          id: '2',
          name: 'genre-2'
        },
        {
          id: '3',
          name: 'genre-3'
        },
        {
          id: '4',
          name: 'genre-4'
        }
      ],
      name_seo: 'Song-1',
      plays: 99
    }

    const { container } = render(<SongItem index={1} {...songData} onLikeSong={jest.fn()} onDislikeSong={jest.fn()} isLiked={false} currentlyPlayedSong={null} setCurrentlyPlayedSong={jest.fn()} />)
    const coverImageEl: HTMLImageElement | null = container.querySelector('.SongItem .cover-image')
    const songNameEl: Element | null = container.querySelector('.SongItem .name')
    const artistNameEl: Element | null = container.querySelector('.SongItem .artist-name')
    const playsCountEl: Element | null = container.querySelector('.SongItem .plays-count')
    const songGenreEls: NodeListOf<Element> = container.querySelectorAll('.SongItem .song-genre')

    if (coverImageEl) {
      expect(coverImageEl.src).toBe(songData.cover_image_path)
      expect(coverImageEl.alt).toBe(songData.name_seo)
    }

    if (songNameEl) {
      expect(songNameEl.innerHTML).toBe(songData.name)
    }

    if (artistNameEl) {
      expect(artistNameEl.innerHTML).toBe(songData.artist_name)
    }

    if (playsCountEl) {
      expect(playsCountEl.innerHTML).toBe(`${songData.plays} plays`)
    }

    if (songGenreEls) {
      expect(songGenreEls.length).toBe(songData.song_genres.slice(0, 3).length)
    }
    
  });

  it('renders the music player correctly', () => {
    const songData = {
      id: '1',
      name: 'Song-1',
      artist_name: 'Artist-1',
      cover_image_path: 'https://cover-image.com/1.jpg',
      music_file_path: 'https://dz2l6nhikl0ua.cloudfront.net/assets/music_file/3f28ee9e-71f0-11eb-8a0d-022ed69f96e6.m4a?cb=20210218145023',
      bpm: 128,
      comments: 0,
      music_file_mimetype: 'audio/mp4',
      song_genres: [],
      name_seo: 'Song-1',
      plays: 99
    }

    const { container } = render(<SongItem  index={1} {...songData} onLikeSong={jest.fn()} onDislikeSong={jest.fn()} isLiked={false} currentlyPlayedSong={null} setCurrentlyPlayedSong={jest.fn()} />)


    const playButtonEl: Element | null = container.querySelector('.rhap_button-clear.rhap_main-controls-button.rhap_play-pause-button')
    const repeatButtonEl: Element | null = container.querySelector('.rhap_button-clear.rhap_repeat-button')
    const rewindButton: Element | null = container.querySelector('.rhap_button-clear.rhap_main-controls-button.rhap_rewind-button')
    const forwardButton: Element | null = container.querySelector('.rhap_button-clear.rhap_main-controls-button.rhap_forward-button')
    const progressBar: Element | null = container.querySelector('.rhap_progress-container')
    const volumeControl: Element | null = container.querySelector('.rhap_volume-controls')

    expect(playButtonEl?.innerHTML).toBeDefined()
    expect(repeatButtonEl?.innerHTML).toBeDefined()
    expect(rewindButton?.innerHTML).toBeDefined()
    expect(forwardButton?.innerHTML).toBeDefined()
    expect(progressBar?.innerHTML).toBeDefined()
    expect(volumeControl?.innerHTML).toBeDefined()
  })

  it('renders the like button correctly', () => {
    const songData = {
      id: '1',
      name: 'Song-1',
      artist_name: 'Artist-1',
      cover_image_path: 'https://cover-image.com/1.jpg',
      music_file_path: 'https://dz2l6nhikl0ua.cloudfront.net/assets/music_file/3f28ee9e-71f0-11eb-8a0d-022ed69f96e6.m4a?cb=20210218145023',
      bpm: 128,
      comments: 0,
      music_file_mimetype: 'audio/mp4',
      song_genres: [],
      name_seo: 'Song-1',
      plays: 99
    }

    const { container } = render(<SongItem  index={1} {...songData} onLikeSong={jest.fn()} onDislikeSong={jest.fn()} isLiked={false} currentlyPlayedSong={null} setCurrentlyPlayedSong={jest.fn()} />)


    const likeButtonEl: Element | null = container.querySelector('.like-btn')

    expect(likeButtonEl?.innerHTML).toBeDefined()

    const likedIcon: HTMLImageElement | null = container.querySelector('.heart-icon')

    expect(likedIcon?.src).toContain('heart-off')

    fireEvent.click(likeButtonEl!)

    expect(likedIcon?.src).toContain('heart-on')
  })
})



