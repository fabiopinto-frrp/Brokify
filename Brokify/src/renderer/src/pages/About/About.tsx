import TitleBar from '@renderer/components/TitleBar/TitleBar'
import Sidebar from '@renderer/components/SideBar/Sidebar'

const About: React.FC = () => {
  return (
    <>
      <TitleBar />
      <div>
        <Sidebar />
        <p>About</p>
      </div>
    </>
  )
}

export default About
