import styled from '@emotion/styled'
import { theme } from '@renderer/styles/theme'

const HomeElement = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 30px);
  background: ${theme.color.bgGradient};
`

export default HomeElement
