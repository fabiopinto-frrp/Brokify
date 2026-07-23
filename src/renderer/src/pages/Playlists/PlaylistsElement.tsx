import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { theme } from '@renderer/styles/theme'

export const PlaylistsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background: ${theme.color.bgGradient};
  color: ${theme.color.text};
`

export const PlaylistsContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding: 40px 48px 80px;
  margin-left: 272px;
  margin-top: 62px;
  flex: 1;
`

export const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  margin: 0;
  color: ${theme.color.text};
`

export const PlaylistsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 18px;
  width: 100%;
  max-width: 1100px;
`

export const PlaylistCard = styled(motion.div)<{ isAddCard?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${(props) => (props.isAddCard ? theme.color.accentSoft : theme.color.panel)};
  backdrop-filter: ${theme.blur.sm};
  -webkit-backdrop-filter: ${theme.blur.sm};
  border: 1px solid ${(props) => (props.isAddCard ? 'rgba(143, 149, 204, 0.35)' : theme.color.panelBorder)};
  border-radius: ${theme.radius.lg};
  padding: 30px;
  min-height: 170px;
  cursor: pointer;
`

export const AddPlaylistIcon = styled.div`
  font-size: 2.4rem;
  font-weight: 300;
  color: ${theme.color.accent};
  margin-bottom: 8px;
  line-height: 1;
`

export const AddPlaylistText = styled.p`
  font-size: 0.95rem;
  font-weight: 600;
  color: ${theme.color.accentStrong};
  margin: 0;
`

export const PlaylistCardTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 6px 0;
  color: ${theme.color.text};
  text-align: center;
  word-break: break-word;
`

export const PlaylistCardDescription = styled.p`
  font-size: 0.85rem;
  color: ${theme.color.textSecondary};
  margin: 0 0 8px 0;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

export const PlaylistCardSongCount = styled.p`
  font-size: 0.85rem;
  color: ${theme.color.textTertiary};
  margin: 0;
  margin-top: auto;
`

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 70px 20px;
  color: ${theme.color.textSecondary};
  text-align: center;
`

export const EmptyStateTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: ${theme.color.text};
`

export const EmptyStateText = styled.p`
  font-size: 1rem;
  margin: 0;
  color: ${theme.color.textSecondary};
`

// Modal styles
export const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.55);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
`

export const ModalContent = styled(motion.div)`
  background: ${theme.color.surface};
  backdrop-filter: ${theme.blur.md};
  -webkit-backdrop-filter: ${theme.blur.md};
  border: 1px solid ${theme.color.panelBorderHover};
  border-radius: ${theme.radius.xl};
  padding: 32px;
  width: 90%;
  max-width: 420px;
  box-shadow: ${theme.shadow.lift};
  color: ${theme.color.text};
`

export const ModalHeader = styled.h2`
  margin: 0 0 22px 0;
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${theme.color.text};
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
`

export const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${theme.color.accentStrong};
`

export const Input = styled.input`
  padding: 12px 16px;
  background-color: rgba(255, 255, 255, 0.04);
  border: 1px solid ${theme.color.panelBorder};
  border-radius: ${theme.radius.sm};
  color: ${theme.color.text};
  font-size: 1rem;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;

  &:focus {
    outline: none;
    border-color: ${theme.color.accent};
    box-shadow: 0 0 0 4px ${theme.color.accentSoft};
  }

  &::placeholder {
    color: ${theme.color.textTertiary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const Textarea = styled.textarea`
  padding: 12px 16px;
  background-color: rgba(255, 255, 255, 0.04);
  border: 1px solid ${theme.color.panelBorder};
  border-radius: ${theme.radius.sm};
  color: ${theme.color.text};
  font-size: 1rem;
  font-family: inherit;
  min-height: 80px;
  resize: vertical;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;

  &:focus {
    outline: none;
    border-color: ${theme.color.accent};
    box-shadow: 0 0 0 4px ${theme.color.accentSoft};
  }

  &::placeholder {
    color: ${theme.color.textTertiary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`

export const Button = styled(motion.button)<{ variant?: 'primary' | 'secondary' }>`
  padding: 11px 22px;
  border: none;
  border-radius: ${theme.radius.sm};
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;

  background: ${(props) => (props.variant === 'secondary' ? 'rgba(255, 255, 255, 0.06)' : theme.color.accentGradient)};
  color: ${(props) => (props.variant === 'secondary' ? theme.color.text : '#1a1b23')};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
