import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { theme } from '@renderer/styles/theme'

export const MediaPlayerDock = styled.div`
  position: fixed;
  bottom: 16px;
  left: 236px; /* sidebar left offset (16px) + sidebar width (220px) */
  right: 0;
  display: flex;
  justify-content: center;
  pointer-events: none;
  z-index: 1000;
`

export const MediaPlayerContainer = styled(motion.div)<{ $collapsed?: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${(props): string =>
    props.$collapsed ? 'min(280px, calc(100vw - 300px))' : 'min(760px, calc(100vw - 300px))'};
  padding: ${(props): string => (props.$collapsed ? '6px 14px 8px' : '8px 22px 16px')};
  background: ${theme.color.panel};
  backdrop-filter: ${theme.blur.lg};
  -webkit-backdrop-filter: ${theme.blur.lg};
  border: 1px solid ${theme.color.panelBorder};
  border-radius: ${(props): string => (props.$collapsed ? theme.radius.pill : theme.radius.xl)};
  box-shadow: ${theme.shadow.lift};
  pointer-events: auto;
`

export const PlayerHeaderRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2px;
`

export const CollapseToggle = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  border: 1px solid ${theme.color.panelBorder};
  border-radius: ${theme.radius.pill};
  background: rgba(255, 255, 255, 0.06);
  color: ${theme.color.textSecondary};
  cursor: pointer;
  outline: none;

  &:hover {
    color: ${theme.color.text};
    border-color: ${theme.color.panelBorderHover};
    background: rgba(255, 255, 255, 0.1);
  }
`

export const CollapsedRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const ControlsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
`

export const NowPlayingSection = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
  justify-self: start;
`

export const ImageContainer = styled.div<{ $compact?: boolean }>`
  flex-shrink: 0;
  display: flex;

  img {
    width: ${(props): string => (props.$compact ? '36px' : '56px')};
    height: ${(props): string => (props.$compact ? '36px' : '56px')};
    object-fit: cover;
    border-radius: ${(props): string => (props.$compact ? theme.radius.pill : theme.radius.md)};
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
  }
`
export const EmptyImageContainer = styled.div<{ $compact?: boolean }>`
  flex-shrink: 0;
  width: ${(props): string => (props.$compact ? '36px' : '56px')};
  height: ${(props): string => (props.$compact ? '36px' : '56px')};
  border-radius: ${(props): string => (props.$compact ? theme.radius.pill : theme.radius.md)};
  background: rgba(255, 255, 255, 0.05);
`

export const TrackInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`

export const TrackTitle = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: ${theme.color.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const TrackArtist = styled.div`
  font-size: 0.76rem;
  color: ${theme.color.textSecondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const TransportControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  justify-self: center;
`

export const Button = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.color.textSecondary};
  background: transparent;
  border: none;
  border-radius: ${theme.radius.pill};
  cursor: pointer;
  width: 30px;
  height: 30px;
  outline: none;

  &:hover {
    color: ${theme.color.text};
  }
`

export const PlayButton = styled(motion.button)<{ $compact?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #14151a;
  background: ${theme.color.accentGradient};
  border: none;
  border-radius: ${theme.radius.pill};
  cursor: pointer;
  width: ${(props): string => (props.$compact ? '34px' : '40px')};
  height: ${(props): string => (props.$compact ? '34px' : '40px')};
  box-shadow: ${theme.shadow.glow};
  outline: none;
`

export const VolumeSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  color: ${theme.color.textTertiary};
  justify-self: end;
`

const rangeBase = `
  -webkit-appearance: none;
  appearance: none;
  outline: none;
  height: 3px;
  border-radius: ${theme.radius.pill};
  background-repeat: no-repeat;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 11px;
    height: 11px;
    background: ${theme.color.text};
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 0 3px rgba(143, 149, 204, 0.3);
    transition: transform 0.15s ease;
  }

  &:hover::-webkit-slider-thumb {
    transform: scale(1.15);
  }

  &::-moz-range-thumb {
    width: 11px;
    height: 11px;
    background: ${theme.color.text};
    border: none;
    border-radius: 50%;
    cursor: pointer;
  }
`

export const Slider = styled.input`
  width: 140px;
  ${rangeBase}
`

export const ProgressRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-width: 0;
  color: ${theme.color.textTertiary};
  font-size: 0.7rem;
  font-variant-numeric: tabular-nums;

  span {
    flex-shrink: 0;
    width: 32px;

    &:last-of-type {
      text-align: right;
    }
  }
`

export const DurationSlider = styled.input`
  flex: 1;
  min-width: 0;
  ${rangeBase}
`
