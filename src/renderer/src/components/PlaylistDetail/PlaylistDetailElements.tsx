import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { theme } from '@renderer/styles/theme'

export const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  z-index: 2500;
`

export const Panel = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: min(420px, 92vw);
  background: ${theme.color.surface};
  backdrop-filter: ${theme.blur.lg};
  -webkit-backdrop-filter: ${theme.blur.lg};
  border-left: 1px solid ${theme.color.panelBorderHover};
  box-shadow: ${theme.shadow.lift};
  z-index: 2600;
  display: flex;
  flex-direction: column;
  padding: 46px 24px 28px;
  color: ${theme.color.text};
`

export const PanelHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`

export const HeaderText = styled.div`
  min-width: 0;
`

export const PanelTitle = styled.h2`
  margin: 0;
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${theme.color.text};
  word-break: break-word;
`

export const PanelDescription = styled.p`
  margin: 6px 0 0 0;
  font-size: 0.88rem;
  color: ${theme.color.textSecondary};
  line-height: 1.4;
`

export const CloseButton = styled(motion.button)`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: ${theme.radius.pill};
  border: 1px solid ${theme.color.panelBorder};
  background: rgba(255, 255, 255, 0.05);
  color: ${theme.color.textSecondary};
  cursor: pointer;
  outline: none;

  &:hover {
    color: ${theme.color.text};
  }
`

export const ActionsRow = styled.div`
  display: flex;
  gap: 10px;
  margin: 20px 0 8px 0;
`

export const PlayAllButton = styled(motion.button)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 11px 16px;
  border: none;
  border-radius: ${theme.radius.sm};
  font-size: 0.92rem;
  font-weight: 600;
  cursor: pointer;
  background: ${theme.color.accentGradient};
  color: #14151a;

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`

export const DeleteButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  flex-shrink: 0;
  border: 1px solid rgba(255, 107, 107, 0.35);
  border-radius: ${theme.radius.sm};
  background: rgba(255, 107, 107, 0.1);
  color: #ff8787;
  cursor: pointer;
`

export const SongCount = styled.p`
  margin: 0 0 6px 0;
  font-size: 0.78rem;
  color: ${theme.color.textTertiary};
  text-transform: uppercase;
  letter-spacing: 0.04em;
`

export const SongList = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 6px;
  padding-right: 4px;
`

export const SongRow = styled(motion.div)<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 9px 10px;
  border-radius: ${theme.radius.md};
  cursor: pointer;
  background: ${(props) => (props.$active ? theme.color.panelActive : 'transparent')};

  &:hover {
    background: ${theme.color.panelHover};
  }
`

export const SongThumbnail = styled.img`
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: ${theme.radius.sm};
`

export const SongThumbnailPlaceholder = styled.div`
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: ${theme.radius.sm};
  background: rgba(255, 255, 255, 0.06);
`

export const SongInfo = styled.div`
  flex: 1;
  min-width: 0;
`

export const SongTitle = styled.p`
  margin: 0;
  font-size: 0.88rem;
  font-weight: 600;
  color: ${theme.color.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const SongArtist = styled.p`
  margin: 2px 0 0 0;
  font-size: 0.76rem;
  color: ${theme.color.textSecondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const RemoveSongButton = styled(motion.button)`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: ${theme.radius.pill};
  border: none;
  background: transparent;
  color: ${theme.color.textTertiary};
  cursor: pointer;

  &:hover {
    color: #ff8787;
    background: rgba(255, 107, 107, 0.12);
  }
`

export const EmptySongs = styled.div`
  padding: 40px 8px;
  text-align: center;
  color: ${theme.color.textSecondary};
  font-size: 0.9rem;
`
