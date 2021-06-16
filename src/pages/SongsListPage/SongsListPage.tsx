import { Helmet } from 'react-helmet'
import { pageTitle, title, songsUrl, likeUrl, apiKey } from './data'
import './styles.scss'
import useFetch from 'use-http'
import { ISong } from '../../components/SongItem/interfaces'
import SongItem from '../../components/SongItem/SongItem'
import Spinner from '../../components/Spinner/Spinner'
import refreshIcon from '../../assets/icons/refresh.svg'
import { useEffect, useState } from 'react'

const SongsListPage = () => {

  const [{ get, loading, error }, { data: songs }] = useFetch(songsUrl);

  const [likedSongs, setLikedSongs] = useState<string[]>([])
  const [currentlyPlayedSong, setCurrentlyPlayedSong] = useState<string | null>(null)

  useEffect(() => {
    get()
    setInitialLikesState()
  }, [get])

  const refetchSongs = () => {
    get()
  }

  const onLikeSong = async (id: string) => {
    const likedSong = await fetch(`${likeUrl}?apikey=${apiKey}`, { 
      method: 'POST', 
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        id
      })
    })

    const likedSongJSON = await likedSong.json()

    setLikesInLocalStorage(likedSongJSON.song_id)
  }

  const setLikesInLocalStorage = (likedSongId: string) => {
    const storedLikes = localStorage.getItem('liked_songs')

    let newLikes: string[] = [likedSongId]
    
    if (storedLikes) {
      newLikes = [...JSON.parse(storedLikes), ...newLikes]
    }
    
    localStorage.setItem('liked_songs', JSON.stringify(newLikes))
    setLikedSongs(newLikes)
  }

  const setInitialLikesState = () => {
    const storedLikes = localStorage.getItem('liked_songs')
    
    if (storedLikes) {
      setLikedSongs(JSON.parse(storedLikes))
    }
  }

  const removeSongFromLiked = (id: string) => {
    const storedLikes = localStorage.getItem('liked_songs')

    let newLikes = []

    if (storedLikes) {
      const parsedLikes = JSON.parse(storedLikes)
      const songIdIndex = parsedLikes.indexOf(id)
      if (songIdIndex > -1) {
        parsedLikes.splice(songIdIndex, 1)
      }

      newLikes = parsedLikes
    }

    localStorage.setItem('liked_songs', JSON.stringify(newLikes))
  }

  const renderSongsList = () => {

    if (loading) {
      return (
        <Spinner/>
      )
    }

    if (error) {
      return (
        <button onClick={refetchSongs} className='refresh-btn'>
          <img className='refresh-icon' src={refreshIcon} alt='refresh-icon'/>
        </button>
      )
    }

    if (songs) {
      return songs.map((eachSong: ISong, index: number) => {
        return (
          <SongItem
            key={eachSong.id}
            index={index}
            {...eachSong}
            isLiked={likedSongs.includes(eachSong.id)}
            onLikeSong={onLikeSong}
            onDislikeSong={removeSongFromLiked}
            currentlyPlayedSong={currentlyPlayedSong}
            setCurrentlyPlayedSong={setCurrentlyPlayedSong}
          />
        )
      })
    }
  }

  return (
    <div className='SongsListPage'>
      <Helmet>
        <meta charSet='utf-8' />
        <title>{pageTitle}</title>
        <link rel='preconnect' href='https://fonts.gstatic.com'/>
        <link href='https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap' rel='stylesheet'/>
      </Helmet>

      <h1 className='title'>{title}</h1>
      <div className='songs-list-wrapper'>
        {renderSongsList()}
      </div>
    </div>
  )
}

export default SongsListPage