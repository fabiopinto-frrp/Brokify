import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { theme } from '@renderer/styles/theme'

export const SearchBarElement = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 56px;
  background: ${theme.color.panel};
  color: ${theme.color.text};
  padding: 0 8px 0 24px;
  position: fixed;
  top: 62px;
  left: 272px;
  right: 272px;
  border-radius: ${theme.radius.pill};
  border: 1px solid ${theme.color.panelBorder};
  backdrop-filter: ${theme.blur.md};
  -webkit-backdrop-filter: ${theme.blur.md};
  z-index: 1000;
  box-shadow: ${theme.shadow.soft};
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;

  &:focus-within {
    border-color: rgba(143, 149, 204, 0.5);
    box-shadow: ${theme.shadow.glow};
  }
`

export const SearchBarInput = styled.input`
  width: 100%;
  height: 100%;
  background-color: transparent;
  color: ${theme.color.text};
  border: none;
  font-size: 1rem;
  padding: 10px 0;
  outline: none;

  &::placeholder {
    color: ${theme.color.textTertiary};
  }
`

export const SearchBarButton = styled(motion.button)`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${theme.color.accentGradient};
  color: #1a1b23;
  height: 40px;
  width: 40px;
  flex-shrink: 0;
  border: none;
  border-radius: ${theme.radius.pill};
  font-size: 1.1rem;
  cursor: pointer;
  outline: none;
`

export const SearchBarIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

export const SearchContainer = styled.div`
  position: fixed;
  top: 138px;
  left: 272px;
  right: 32px;
  bottom: 168px; /* clears the fixed MediaPlayerDock so results stay clickable */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  align-content: start;
  gap: 16px;
  padding: 4px;
  overflow-y: auto;
  z-index: 10;
`

export const SearchStatus = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.color.textSecondary};
  font-size: 0.95rem;
`

export const ResultCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 12rem;
  background: ${theme.color.panel};
  backdrop-filter: ${theme.blur.sm};
  -webkit-backdrop-filter: ${theme.blur.sm};
  border: 1px solid ${theme.color.panelBorder};
  color: ${theme.color.text};
  padding: 18px;
  border-radius: ${theme.radius.lg};
`

export const Thumbnail = styled.img`
  width: 72%;
  border-radius: ${theme.radius.md};
  margin-top: 4px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
`
export const VideoTitle = styled.h3`
  font-size: 0.95rem;
  font-weight: 600;
  margin-top: 14px;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`
export const ChannelTitle = styled.p`
  font-size: 0.8rem;
  color: ${theme.color.textSecondary};
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`

export const ResultCardButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  margin-top: auto;
  padding-top: 14px;
  justify-content: center;
`

export const AddToPlaylistButton = styled(motion.button)`
  flex: 1;
  padding: 8px 12px;
  background: ${theme.color.accentGradient};
  color: #1a1b23;
  border: none;
  border-radius: ${theme.radius.sm};
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
`
