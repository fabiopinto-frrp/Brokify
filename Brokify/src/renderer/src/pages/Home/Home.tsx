import { motion } from 'framer-motion'
import Cursor from '../../components/Cursor'
import TitleBar from '../../components/TitleBar/TitleBar'
import HomeElement from './HomeElement'
import Sidebar from '../../components/SideBar/Sidebar'
import Searchbar from '../../components/SearchBar/Searchbar'

const Home: React.FC = () => {
  return (
    <>
      <TitleBar />
      <HomeElement>
        <motion.div>
          <Cursor />
          <Sidebar />
          <Searchbar />
        </motion.div>
      </HomeElement>
    </>
  )
}

export default Home
