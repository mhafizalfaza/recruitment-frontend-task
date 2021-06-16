import { useState, useRef, useEffect } from 'react'
import { ISongItemProps } from "./interfaces"
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import './styles.scss'
import HeartOn from '../../assets/icons/heart-on.svg'
import HeartOff from '../../assets/icons/heart-off.svg'
import Truncate from 'react-truncate';

const SongItem = ({
  id,
  name,
  artist_name,
  music_file_path,
  cover_image_path,
  song_genres,
  plays,
  name_seo,
  index,
  onLikeSong,
  onDislikeSong,
  isLiked,
  currentlyPlayedSong,
  setCurrentlyPlayedSong
}: ISongItemProps) => {

  const songItemEl = useRef<HTMLDivElement>(null);

  const [isLikedState, setIsLikedState] = useState(isLiked)

  const audioPlayerRef: any = useRef(null)

  useEffect(() => {
    songItemEl?.current?.setAttribute('style', `--animation-order: ${index};`)
  }, [index])

  useEffect(() => {
    pausePreviouslyPlayedSong()
  }, [currentlyPlayedSong])

  const pausePreviouslyPlayedSong = () => {
    const audioPlayerInstance = audioPlayerRef?.current
    const isSongPlaying = audioPlayerInstance?.isPlaying()
    const audioEl = audioPlayerInstance.audio.current

    if (isSongPlaying && currentlyPlayedSong !== id) {
      audioEl.pause()
    } 
  }

  const onClickLike = () => {
    setIsLikedState(!isLikedState)
    if (!isLikedState) {
      return onLikeSong(id)
    }
    onDislikeSong(id)
  }

  const renderGenres = () => {
    return song_genres.slice(0, 3).map((eachGenre) => {
      return (
        <span key={eachGenre.id} className='song-genre'>
          {eachGenre.name}
        </span>
      )
    })
  }

  const screenWidth = window.innerWidth

  return (
    <div className='SongItem' ref={songItemEl}>
      <div className='info'>
        <img src={cover_image_path} alt={name_seo} className='cover-image' />

        <div className='text'>
          <Truncate lines={2} ellipsis={<span>...</span>} width={screenWidth < 640 ? screenWidth - 200 : 480}>
            {name}
          </Truncate>
          <p className='artist-name'>
            {artist_name}
          </p>
          <div className='genres-and-plays'>
            <div className='genres'>
              {renderGenres()}
            </div>
            <p className='plays-count'>
              {plays} plays
            </p>
          </div>
          
        </div>

        <button onClick={onClickLike} className='like-btn'>
          <img src={isLikedState ? HeartOn : HeartOff} alt='heart-icon' className='heart-icon' />
        </button>
        
      </div>

      <AudioPlayer
        autoPlay={false}
        src={music_file_path}
        onPlay={() => setCurrentlyPlayedSong(id)}
        ref={audioPlayerRef}
      />
    </div>
  )
}

export default SongItem