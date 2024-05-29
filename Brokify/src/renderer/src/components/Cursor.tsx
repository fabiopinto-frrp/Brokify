import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import styled from '@emotion/styled'

const CursorDiv = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 50px;
  height: 50px;
  border: 2px solid #72b884;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  box-shadow:
    0 0 10px #72b884,
    0 0 5px #72b884;
`
// const Dot = styled.div`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   width: 5px;
//   height: 5px;
//   background: #72b884;
//   border-radius: 50%;
//   transform: translate(-50%, -50%);
// `

const Cursor: React.FC = () => {
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  useEffect(() => {
    const moveCursor = (e: MouseEvent): void => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    document.addEventListener('mousemove', moveCursor)

    return () => {
      document.removeEventListener('mousemove', moveCursor)
    }
  }, [cursorX, cursorY])

  const springConfig = { damping: 20, stiffness: 200 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  return (
    <CursorDiv
      style={{ x: cursorXSpring, y: cursorYSpring, translateX: '-50%', translateY: '-50%' }}
    >
      {/* <Dot /> */}
    </CursorDiv>
  )
}

export default Cursor
