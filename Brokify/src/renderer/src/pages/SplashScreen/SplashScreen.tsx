import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import catImage from '../../assets/Brokify.png'
import styled from '@emotion/styled'
import soundFile from '../../assets/catMusic.mp3'
import Cursor from '../../components/Cursor'
import TitleBar from '../../components/TitleBar/TitleBar'
import './splashScreen.css'

const SplashScreen: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      navigate('/Home')
    }, 4000)
    audioRef.current?.play()
    return () => {
      audioRef.current?.play()
      clearTimeout(timer)
    }
  }, [navigate])

  const MotionImage = motion.img

  const Image = styled(MotionImage)`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 40%;
    height: 40%;
  `

  return loading ? (
    <>
      <Cursor />
      <TitleBar />
      <div className="splashScreen-container">
        <motion.div>
          <Image
            src={catImage}
            alt="cat"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
              duration: 2,
              delay: 0.8
            }}
          />
          <audio ref={audioRef} src={soundFile} />
        </motion.div>
      </div>
    </>
  ) : null
}

export default SplashScreen
