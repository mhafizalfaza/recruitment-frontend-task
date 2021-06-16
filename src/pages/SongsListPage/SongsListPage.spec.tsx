import { fireEvent, render, screen } from '@testing-library/react'
import SongsListPage from './SongsListPage'
import { title } from './data'

jest.mock('use-http')
jest.mock('../../components/Spinner/Spinner', () => {
  return {
    __esModule: true,
    A: true,
    default: () => {
      return <span>Loading...</span>
    },
  };
})
jest.mock('react-truncate', () => {
  return {
    __esModule: true,
    A: true,
    default: ({ children }: { children: any }) => {
      return <p>{ children }</p>
    },
  };
})

import useFetch from 'use-http'

jest
.spyOn(window.HTMLMediaElement.prototype, 'load')
.mockImplementation(() => {})

describe('SongsListPage', () => {
  it('renders SongsListPage title', () => {

    (useFetch as jest.MockedFunction<any>).mockReturnValueOnce([{ get: jest.fn(), post: jest.fn(), loading: false, error: false }, { data: [] }])

    const { container } = render(<SongsListPage />)
    const renderedTitle = container.querySelector('h1')
    expect(renderedTitle?.innerHTML).toBe(title)
  });

  it('renders loading indicator when fetching songs', () => {

    (useFetch as jest.MockedFunction<any>).mockReturnValueOnce([{ get: jest.fn(), post: jest.fn(), loading: true, error: false }, { data: [] }])

    render(<SongsListPage />)

    const loadingIndicator = screen.getByText('Loading...')
    expect(loadingIndicator).toBeInTheDocument()
  })

  it('renders retry button when fetching songs returns error', () => {

    (useFetch as jest.MockedFunction<any>).mockReturnValueOnce([{ get: jest.fn(), post: jest.fn(), loading: false, error: true }, { data: null }])

    const { container } = render(<SongsListPage />)

    const retryButton = container.querySelector('.refresh-btn')
    expect(retryButton?.innerHTML).toBeDefined()
  })

  it('triggers get method from useFetch when retry button is clicked', () => {

    const getMethod = jest.fn();

    (useFetch as jest.MockedFunction<any>).mockReturnValueOnce([{ get: getMethod, post: jest.fn(), loading: false, error: true }, { data: null }])

    const { container } = render(<SongsListPage />)

    const retryButton = container.querySelector('.refresh-btn')
    expect(retryButton?.innerHTML).toBeDefined()

    fireEvent.click(retryButton!)

    expect(getMethod).toHaveBeenCalledTimes(2)
  })

  it('renders the correct number of songs', () => {
    
    const songsList = [{
      id: '1',
      name: 'Song-1',
      artist_name: 'Artist-1',
      cover_image_path: 'https://cover-image.com/1.jpg',
      music_file_path: 'https://dz2l6nhikl0ua.cloudfront.net/assets/music_file/3f28ee9e-71f0-11eb-8a0d-022ed69f96e6.m4a?cb=20210218145023',
      name_seo: 'Song-2',
      plays: 99,
      song_genres: []
    },
    {
      id: '2',
      name: 'Song-2',
      artist_name: 'Artist-2',
      cover_image_path: 'https://cover-image.com/2.jpg',
      music_file_path: 'https://dz2l6nhikl0ua.cloudfront.net/assets/music_file/3f28ee9e-71f0-11eb-8a0d-022ed69f96e6.m4a?cb=20210218145023',
      name_seo: 'Song-2',
      plays: 99,
      song_genres: []
    },
    {
      id: '3',
      name: 'Song-3',
      artist_name: 'Artist-3',
      cover_image_path: 'https://cover-image.com/3.jpg',
      music_file_path: 'https://dz2l6nhikl0ua.cloudfront.net/assets/music_file/3f28ee9e-71f0-11eb-8a0d-022ed69f96e6.m4a?cb=20210218145023',
      name_seo: 'Song-3',
      plays: 99,
      song_genres: []
    }];

    (useFetch as jest.MockedFunction<any>).mockReturnValueOnce([{ get: jest.fn(), post: jest.fn(), loading: false, error: false }, { data: songsList }])

    const { container } = render(<SongsListPage />)

    const songsListWrapper = container.querySelector('.songs-list-wrapper')
    const songEls = songsListWrapper ? songsListWrapper.children : []
    expect(songEls?.length).toBe(songsList.length)
  })


  it('renders the music player correctly', () => {
    
    const songsList = [{
      id: '1',
      name: 'Song-1',
      artist_name: 'Artist-1',
      cover_image_path: 'https://cover-image.com/1.jpg',
      music_file_path: 'https://dz2l6nhikl0ua.cloudfront.net/assets/music_file/3f28ee9e-71f0-11eb-8a0d-022ed69f96e6.m4a?cb=20210218145023',
      name_seo: 'Song-1',
      plays: 99,
      song_genres: []
    },
    {
      id: '2',
      name: 'Song-2',
      artist_name: 'Artist-2',
      cover_image_path: 'https://cover-image.com/2.jpg',
      music_file_path: 'https://dz2l6nhikl0ua.cloudfront.net/assets/music_file/3f28ee9e-71f0-11eb-8a0d-022ed69f96e6.m4a?cb=20210218145023',
      name_seo: 'Song-2',
      plays: 99,
      song_genres: []
    },
    {
      id: '3',
      name: 'Song-3',
      artist_name: 'Artist-3',
      cover_image_path: 'https://cover-image.com/3.jpg',
      music_file_path: 'https://dz2l6nhikl0ua.cloudfront.net/assets/music_file/3f28ee9e-71f0-11eb-8a0d-022ed69f96e6.m4a?cb=20210218145023',
      name_seo: 'Song-3',
      plays: 99,
      song_genres: []
    }];

    (useFetch as jest.MockedFunction<any>).mockReturnValueOnce([{ get: jest.fn(), loading: false, error: false }, { data: songsList }])

    const { container } = render(<SongsListPage />)

    const songsListWrapper = container.querySelector('.songs-list-wrapper')
    const songEls = songsListWrapper ? songsListWrapper.children : []
    expect(songEls?.length).toBe(songsList.length)

    Object.values(songEls).forEach((eachSongEl, i) => {
      
      const playButtonEl: Element | null = eachSongEl.querySelector('.rhap_button-clear.rhap_main-controls-button.rhap_play-pause-button')
      const repeatButtonEl: Element | null = eachSongEl.querySelector('.rhap_button-clear.rhap_repeat-button')
      const rewindButton: Element | null = eachSongEl.querySelector('.rhap_button-clear.rhap_main-controls-button.rhap_rewind-button')
      const forwardButton: Element | null = eachSongEl.querySelector('.rhap_button-clear.rhap_main-controls-button.rhap_forward-button')
      const progressBar: Element | null = eachSongEl.querySelector('.rhap_progress-container')
      const volumeControl: Element | null = eachSongEl.querySelector('.rhap_volume-controls')

      expect(playButtonEl?.innerHTML).toBeDefined()
      expect(repeatButtonEl?.innerHTML).toBeDefined()
      expect(rewindButton?.innerHTML).toBeDefined()
      expect(forwardButton?.innerHTML).toBeDefined()
      expect(progressBar?.innerHTML).toBeDefined()
      expect(volumeControl?.innerHTML).toBeDefined()
    })
  })
})



