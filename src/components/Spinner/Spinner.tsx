import Lottie from 'react-lottie';
import animationData from '../../spinner.json'

const Spinner = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <Lottie options={defaultOptions}
      height={100}
      width={100}
      isStopped={false}
      isPaused={false}
      isClickToPauseDisabled={true}
    />
  )
}

export default Spinner