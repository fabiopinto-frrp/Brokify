import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { theme } from '@renderer/styles/theme'

export const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background: ${theme.color.bgGradient};
  color: ${theme.color.text};
`

export const AboutContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 40px 48px 80px;
  margin-left: 272px;
  margin-top: 62px;
  max-width: 620px;
`

export const SectionTitle = styled.h2`
  font-size: 1.7rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0;
  color: ${theme.color.text};
`

export const SettingsSection = styled(motion.div)`
  background: ${theme.color.panel};
  backdrop-filter: ${theme.blur.sm};
  -webkit-backdrop-filter: ${theme.blur.sm};
  padding: 28px;
  border-radius: ${theme.radius.lg};
  border: 1px solid ${theme.color.panelBorder};
  transition: border-color 0.3s ease;

  &:hover {
    border-color: ${theme.color.panelBorderHover};
  }
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
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
  font-family: inherit;

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

export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
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

export const SuccessMessage = styled(motion.div)`
  background-color: rgba(95, 217, 126, 0.12);
  border: 1px solid rgba(95, 217, 126, 0.4);
  color: #8ce6a3;
  padding: 12px 16px;
  border-radius: ${theme.radius.sm};
  font-size: 0.9rem;
  margin-bottom: 16px;
`

export const ErrorMessage = styled(motion.div)`
  background-color: rgba(255, 107, 107, 0.12);
  border: 1px solid rgba(255, 107, 107, 0.4);
  color: #ff8787;
  padding: 12px 16px;
  border-radius: ${theme.radius.sm};
  font-size: 0.9rem;
  margin-bottom: 16px;
`

export const InfoText = styled.p`
  font-size: 0.88rem;
  color: ${theme.color.textSecondary};
  margin: 8px 0 0 0;
  line-height: 1.5;
`
