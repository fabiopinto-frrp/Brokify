import { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import styled from '@emotion/styled'

interface CursorDivProps {
  hovering: string
}

declare global {
  interface Window {
    api: {
      invoke: (channel: string, ...args: unknown[]) => Promise<unknown>
    }
  }
}

const CursorDiv = styled(motion.div)<CursorDivProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 50px;
  height: 50px;
  border: 2px solid ${(props): string => props.hovering};
  border-radius: 50%;
  pointer-events: none;
  z-index: 99999;
  transform: translate(-50%, -50%);
  box-shadow:
    0 0 10px ${(props): string => props.hovering},
    0 0 5px ${(props): string => props.hovering};
`

const Cursor: React.FC = () => {
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const [hovering, setHovering] = useState('')

  useEffect(() => {
    const moveCursor = (e: MouseEvent): void => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const hoverButtons = (e: MouseEvent): void => {
      switch ((e.target as HTMLElement).id) {
        case 'minimize-button':
          setHovering('#fbbc05')
          break
        case 'maximize-button':
          setHovering('#34a853')
          break
        case 'close-button':
          setHovering('#ea4335')
          break
        case 'title-bar':
          setHovering('#72b884') // Change this to the color you want for the title bar
          break
        default:
          setHovering('#72b884')
      }
    }

    const clickButtons = (e: MouseEvent): void => {
      switch ((e.target as HTMLElement).id) {
        case 'minimize-button':
          window.api.invoke('minimize-window')
          break
        case 'maximize-button':
          window.api.invoke('maximize-window')
          break
        case 'close-button':
          window.api.invoke('close-window')
          break
      }
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', hoverButtons)
    window.addEventListener('click', clickButtons)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', hoverButtons)
      window.removeEventListener('click', clickButtons)
    }
  }, [cursorX, cursorY])

  const springConfig = { damping: 20, stiffness: 200 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  return (
    <CursorDiv
      id="cursor"
      style={{ x: cursorXSpring, y: cursorYSpring, translateX: '-50%', translateY: '-50%' }}
      hovering={hovering}
    ></CursorDiv>
  )
}

export default Cursor
