import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { theme } from '@renderer/styles/theme'

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
  max-width: 500px;
  max-height: 70vh;
  overflow-y: auto;
  box-shadow: ${theme.shadow.lift};
  color: ${theme.color.text};
`

export const ModalHeader = styled.h2`
  margin: 0 0 20px 0;
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${theme.color.text};
`

export const PlaylistsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`

export const PlaylistCard = styled(motion.div)`
  background: ${theme.color.panel};
  padding: 15px;
  border-radius: ${theme.radius.md};
  cursor: pointer;
  border: 1px solid ${theme.color.panelBorder};
`

export const PlaylistName = styled.p`
  margin: 0 0 5px 0;
  font-size: 1rem;
  font-weight: 600;
`

export const PlaylistItemCount = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: ${theme.color.textSecondary};
`

export const EmptyState = styled.div`
  text-align: center;
  padding: 20px;
  color: ${theme.color.textSecondary};
`

export const CreatePlaylistForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: ${theme.radius.md};
  border: 1px solid ${theme.color.panelBorderHover};
`

export const FormLabel = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${theme.color.accentStrong};
`

export const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.04);
  color: ${theme.color.text};
  border: 1px solid ${theme.color.panelBorder};
  border-radius: ${theme.radius.sm};
  font-size: 0.95rem;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${theme.color.accent};
    box-shadow: 0 0 0 4px ${theme.color.accentSoft};
  }

  &::placeholder {
    color: ${theme.color.textTertiary};
  }
`

export const FormTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.04);
  color: ${theme.color.text};
  border: 1px solid ${theme.color.panelBorder};
  border-radius: ${theme.radius.sm};
  font-size: 0.95rem;
  min-height: 80px;
  resize: vertical;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
  box-sizing: border-box;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${theme.color.accent};
    box-shadow: 0 0 0 4px ${theme.color.accentSoft};
  }

  &::placeholder {
    color: ${theme.color.textTertiary};
  }
`

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`

export const Button = styled(motion.button)<{ variant?: 'primary' | 'secondary' }>`
  padding: 10px 20px;
  border: none;
  border-radius: ${theme.radius.sm};
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;

  background: ${(props) => (props.variant === 'secondary' ? 'rgba(255, 255, 255, 0.06)' : theme.color.accentGradient)};
  color: ${(props) => (props.variant === 'secondary' ? theme.color.text : '#1a1b23')};
`

export const AddButton = styled(Button)`
  background: ${theme.color.accentGradient};
  color: #1a1b23;
  width: 100%;
  margin-top: 10px;
`

export const SongPreview = styled.div`
  background: rgba(255, 255, 255, 0.03);
  padding: 15px;
  border-radius: ${theme.radius.md};
  border: 1px solid ${theme.color.panelBorderHover};
  margin-bottom: 20px;
`

export const PreviewTitle = styled.p`
  margin: 0 0 5px 0;
  font-size: 0.85rem;
  color: ${theme.color.textSecondary};
  font-weight: 600;
`

export const PreviewValue = styled.p`
  margin: 0;
  font-size: 1rem;
  color: ${theme.color.text};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
