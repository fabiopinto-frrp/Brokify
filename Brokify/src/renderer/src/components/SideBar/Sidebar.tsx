import { useNavigate } from 'react-router-dom'
import { SidebarElement, Nav, SideItemList, SideItem } from './SidebarElements'
import { FaGithub, FaLinkedin, FaQuestionCircle } from 'react-icons/fa'
import { AiFillHome } from 'react-icons/ai'
import { CiBoxList } from 'react-icons/ci'
import { MdOutlinePlaylistPlay } from 'react-icons/md'

const Sidebar: React.FC = () => {
  const navigate = useNavigate()

  return (
    <SidebarElement>
      <Nav>
        <SideItemList>
          <SideItem>
            <a id="side-item" onClick={() => navigate('/Home')}>
              <AiFillHome />
              Home
            </a>
          </SideItem>
          <SideItem>
            <a id="side-item" onClick={() => navigate('/Genres')}>
              <CiBoxList />
              Genres
            </a>
          </SideItem>
          <SideItem>
            <a id="side-item" onClick={() => navigate('/Playlists')}>
              <MdOutlinePlaylistPlay />
              Playlists
            </a>
          </SideItem>
        </SideItemList>
      </Nav>
      <Nav className="blue-glow">
        <SideItemList>
          <SideItem>
            <a id="side-item-bottom" onClick={() => navigate('/About')}>
              <FaQuestionCircle />
              About
            </a>
          </SideItem>
          <SideItem>
            <a
              id="side-item-bottom"
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
              LinkedIn
            </a>
          </SideItem>
          <SideItem>
            <a
              id="side-item-bottom"
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
              GitHub
            </a>
          </SideItem>
        </SideItemList>
      </Nav>
    </SidebarElement>
  )
}

export default Sidebar
