import { useLocation, useNavigate } from 'react-router-dom'
import {
  SidebarElement,
  Nav,
  SideItemList,
  SideItem,
  ActivePill,
  Divider,
  BrandRow
} from './SidebarElements'
import { FaGithub, FaLinkedin, FaQuestionCircle } from 'react-icons/fa'
import { AiFillHome } from 'react-icons/ai'
import { MdOutlinePlaylistPlay } from 'react-icons/md'
import { theme } from '@renderer/styles/theme'

const mainItems = [
  { id: 'side-item', path: '/Home', label: 'Home', icon: <AiFillHome /> },
  { id: 'side-item', path: '/Playlists', label: 'Playlists', icon: <MdOutlinePlaylistPlay /> }
]

const Sidebar: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <SidebarElement>
      <div>
        <BrandRow>
          <span>Brokify</span>
        </BrandRow>
        <Nav>
          <SideItemList>
            {mainItems.map((item) => {
              const active = location.pathname === item.path
              return (
                <SideItem
                  key={item.path}
                  id={item.id}
                  $active={active}
                  $variant="amber"
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.97 }}
                  transition={theme.spring.snappy}
                >
                  {active && (
                    <ActivePill
                      layoutId="sidebar-active-pill"
                      transition={theme.spring.soft}
                    />
                  )}
                  <a onClick={() => navigate(item.path)}>
                    {item.icon}
                    {item.label}
                  </a>
                </SideItem>
              )
            })}
          </SideItemList>
        </Nav>
      </div>

      <div style={{ width: '100%' }}>
        <Divider />
        <Nav className="blue-glow">
          <SideItemList>
            <SideItem
              id="side-item-bottom"
              $variant="lavender"
              $active={location.pathname === '/About'}
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.97 }}
              transition={theme.spring.snappy}
            >
              {location.pathname === '/About' && (
                <ActivePill layoutId="sidebar-active-pill" transition={theme.spring.soft} />
              )}
              <a onClick={() => navigate('/About')}>
                <FaQuestionCircle />
                About
              </a>
            </SideItem>
            <SideItem id="side-item-bottom" $variant="lavender" whileHover={{ x: 3 }} whileTap={{ scale: 0.97 }} transition={theme.spring.snappy}>
              <a href="https://www.linkedin.com/in/fabiopinto-frrp/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
                LinkedIn
              </a>
            </SideItem>
            <SideItem id="side-item-bottom" $variant="lavender" whileHover={{ x: 3 }} whileTap={{ scale: 0.97 }} transition={theme.spring.snappy}>
              <a href="https://github.com/fabiopinto-frrp" target="_blank" rel="noopener noreferrer">
                <FaGithub />
                GitHub
              </a>
            </SideItem>
          </SideItemList>
        </Nav>
      </div>
    </SidebarElement>
  )
}

export default Sidebar
