import styled from '@emotion/styled'

export const SidebarElement = styled.aside`
  position: fixed;
  top: 30px;
  left: 0;
  height: 100%;
  width: 14%;
  background-color: #2e2f38;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* This line is new */
  align-items: center;
  padding-left: 20px;
`

export const Nav = styled.nav`
  &:first-child li:first-child {
    margin-top: 20px;
  }

  &:last-child li:last-child {
    margin-bottom: 90%;
  }

  &.blue-glow li a:hover {
    text-shadow: 0 0 10px #8f95cc;
    color: #8f95cc;
  }

  &.blue-glow li:hover svg {
    fill: #8f95cc;
  }
`

export const SideItemList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;

  li {
    margin-bottom: 20px;
    a {
      color: white;
      text-decoration: none;
      font-size: 1.2rem;
      cursor: pointer;
    }
  }
`
export const SideItem = styled.li`
  margin-bottom: 5%;
  margin-left: -5%;
  a {
    display: flex; /* Makes the a element a flex container */
    flex-direction: row; /* Aligns the SVG and the text horizontally */
    align-items: center; /* Centers the SVG and the text vertically */
    transition:
      transform 0.3s ease-in-out,
      text-shadow 0.3s ease-in-out,
      color 0.3s ease-in-out;
    &:hover {
      transform: scale(1.1);
      text-shadow: 0 0 10px #ccab8f;
      color: #ccab8f;
    }
  }
  svg {
    margin-right: 10px;
    width: 20px;
    height: 20px;
    transition: fill 0.3s ease-in-out;
  }

  &:hover svg {
    fill: #ccab8f;
  }
`
