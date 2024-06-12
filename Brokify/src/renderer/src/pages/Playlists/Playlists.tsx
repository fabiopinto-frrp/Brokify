import Sidebar from '@renderer/components/SideBar/Sidebar'
import TitleBar from '@renderer/components/TitleBar/TitleBar'

const Playlists: React.FC = () => {
  return (
    <>
      <TitleBar />
      <div>
        <Sidebar />
        <p>Playlists</p>
      </div>
    </>
  )
}

export default Playlists
