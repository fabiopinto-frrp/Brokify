import { motion } from 'framer-motion'
import Cursor from '../../components/Cursor'
import TitleBar from '../../components/TitleBar/TitleBar'
import './home.css'
const Home: React.FC = () => {
  return (
    <>
      <TitleBar />
      <div className="home-container">
        <motion.div>
          <Cursor />
          <p>Home!</p>
        </motion.div>
      </div>
    </>
  )
}

export default Home
