import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import catImage from '../assets/cat.jpg'

const SplashScreen: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      navigate('/Home')
    }, 2000)

    return () => clearTimeout(timer)
  }, [navigate])

  return loading ? (
    <motion.div>
      <img src={catImage} height="500px" width="500px"></img>
    </motion.div>
  ) : null
}

export default SplashScreen
