import TitleBar from '@renderer/components/TitleBar/TitleBar'
import Sidebar from '@renderer/components/SideBar/Sidebar'

const Genres: React.FC = () => {
  return (
    <>
      <TitleBar />
      <div>
        <Sidebar />
        <p>Genres</p>
      </div>
    </>
  )
}

export default Genres
