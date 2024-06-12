import styled from '@emotion/styled'

export const SearchBarElement = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 7%;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  padding: 0 20px;
  position: fixed;
  margin-top: 4%;
  margin-left: 30%;
  border-radius: 10px;
  border-bottom: 2px solid transparent;
  top: 0;
  left: 0;
  z-index: 1000;

  box-shadow: 0 10px 6px -1px rgba(0, 0, 0, 0.1);
  transition:
    box-shadow 0.3s ease,
    transform 0.3s ease;

  &:hover {
    box-shadow: 0 7px 8px -8px #8f95cc;
    transform: scale(1.005);
  }
`

export const SearchBarInput = styled.input`
  width: 100%;
  height: 60%;
  margin-top: 1%;
  background-color: transparent;
  color: white;
  border: none;
  border-bottom: 2px solid transparent;
  font-size: 1.2rem;
  padding: 10px;
  outline: none;
  transition: border-bottom-color 0.3s ease;
  &:focus {
    border-bottom: 2px solid #8f95cc;
    box-shadow: 0 5px 8px -8px #8f95cc;
  }
`

export const SearchBarButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  height: 60%;
  border: 2px solid transparent;
  border-radius: 10px;
  margin-left: 2%;
  font-size: 1.2rem;
  cursor: pointer;
  outline: none;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease,
    transform 0.3s ease;
  box-shadow: 0 10px 6px -1px rgba(0, 0, 0, 0.4);

  &:hover {
    background-color: rgba(143, 149, 204, 0.6);
    transform: scale(1.05);
    color: #2e2f38;
    border: 2px solid #8f95cc;
    box-shadow: 0 7px 8px -8px #8f95cc;
  }
`

export const SearchBarIcon = styled.div`
  margin-top: 50%;
  width: 100%;
  height: 100%;
  cursor: pointer;
  color: white;
  &:hover {
    transform: scale(1.01);
  }
`

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: 50rem;
  height: 35rem;
  margin-top: 0%;
  background-color: #2e2f38;
  border-radius: 10px;
  padding: 10px;
  margin-left: 10%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: #1e1f24;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #8f95cc;
    border-radius: 10px;
    border: 3px solid #1e1f24;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #5f658c;
  }
`

export const ResultCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(50% - 30px);
  min-height: 10rem;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  padding: 0 20px;
  border-radius: 10px;
  margin: 10px;

  box-shadow: 0 10px 6px -1px rgba(0, 0, 0, 0.1);
  transition:
    box-shadow 0.3s ease,
    transform 0.3s ease;

  &:hover {
    box-shadow: 0 7px 8px -8px #8f95cc;
    transform: scale(1.005);
  }
`

export const Thumbnail = styled.img`
  width: 50%;
  height: 50%;
  margin-top: 4%;
  border-radius: 10px;
`
export const VideoTitle = styled.h3`
  font-size: 1rem;
  margin-top: 2%;
  margin-bottom: 2%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`
export const ChannelTitle = styled.p`
  font-size: 0.8rem;
  margin-bottom: 2%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`
