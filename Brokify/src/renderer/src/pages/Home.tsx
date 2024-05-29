import { motion } from 'framer-motion'
import Cursor from '../components/Cursor'

const Home: React.FC = () => {
  return (
    <motion.div>
      <Cursor />
      <p>Home!</p>
    </motion.div>
  )
}

export default Home
