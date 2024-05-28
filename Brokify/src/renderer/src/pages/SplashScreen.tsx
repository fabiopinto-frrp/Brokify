import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import catImage from '../assets/Brokify.png'
import styled from '@emotion/styled'
import soundFile from '../assets/catMusic.mp3'

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
  const Image = styled.img`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 50%;
    height: 50%;
  `

  return loading ? (
    <motion.div>
      <Image src={catImage} alt="cat" />
      <audio ref={audioRef} src={soundFile} />
    </motion.div>
  ) : null
}

export default SplashScreen
