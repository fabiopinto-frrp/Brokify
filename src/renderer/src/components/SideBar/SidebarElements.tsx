import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { theme } from '@renderer/styles/theme'

export const SidebarElement = styled.aside`
  position: fixed;
  top: 46px;
  left: 16px;
  height: calc(100% - 62px);
  width: 220px;
  background: ${theme.color.panel};
  backdrop-filter: ${theme.blur.md};
  -webkit-backdrop-filter: ${theme.blur.md};
  border: 1px solid ${theme.color.panelBorder};
  border-radius: ${theme.radius.lg};
  box-shadow: ${theme.shadow.soft};
  color: ${theme.color.text};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  padding: 20px 14px;
  z-index: 900;
`

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
`

export const SideItemList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const SideItem = styled(motion.li)<{ $active?: boolean; $variant: 'amber' | 'lavender' }>`
  position: relative;
  border-radius: ${theme.radius.md};
  overflow: hidden;

  a {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
    padding: 10px 14px;
    font-size: 0.95rem;
    font-weight: ${(props) => (props.$active ? 600 : 500)};
    color: ${(props) => (props.$active ? theme.color.text : theme.color.textSecondary)};
    text-decoration: none;
    cursor: pointer;
    transition:
      color 0.25s ease,
      transform 0.25s ${theme.easeCss};
  }

  svg {
    position: relative;
    z-index: 1;
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    transition: fill 0.25s ease;
  }

  &:hover a {
    color: ${(props) => (props.$variant === 'amber' ? theme.color.amber : theme.color.accent)};
  }

  &:hover svg {
    fill: ${(props) => (props.$variant === 'amber' ? theme.color.amber : theme.color.accent)};
  }
`

export const ActivePill = styled(motion.div)`
  position: absolute;
  inset: 0;
  border-radius: ${theme.radius.md};
  background: ${theme.color.panelActive};
  border: 1px solid ${theme.color.panelBorderHover};
`

export const Divider = styled.div`
  height: 1px;
  margin: 14px 6px;
  background: ${theme.color.panelBorder};
`

export const BrandRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 10px 18px 10px;

  span {
    font-weight: 700;
    font-size: 1.05rem;
    letter-spacing: -0.02em;
    background: ${theme.color.accentGradient};
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`
