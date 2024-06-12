import styled from '@emotion/styled'

export const MediaPlayerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-40%);
  margin-bottom: 2%;
  width: 65%;
  height: 15%;
  background-color: #2e2f38;
  border-radius: 10px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`

export const MediaButtonContainer = styled.div`
display: 'flex';\
flexDirection: 'column';
 alignItems: 'center';
 
`

export const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  margin-top: 10%;
  margin-bottom: 10%;
  img {
    width: 40%;
    margin-top: 5%;
    margin-bottom: 5%;
    border-radius: 10px;
  }
`
export const EmptyImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  background-color: #17171c;
  img {
    max-width: 100px;
    background-color: #17171c;
  }
`

export const ButtonContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  button {
    margin: 0 10px;
  }
`
export const Button = styled.button`
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  border: 2px solid #8f95cc;
  border-radius: 5px;
  cursor: pointer;
  padding: 4%;
  outline: none;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease;
  box-shadow: 0 10px 6px -1px rgba(0, 0, 0, 0.4);

  &:hover {
    background-color: rgba(143, 149, 204, 0.6);
    color: #fff;
    box-shadow: 0 7px 8px -8px #8f95cc;
  }
`

export const Slider = styled.input`
  width: 40%;
  -webkit-appearance: none;
  background-color: #8f95cc;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
  border-radius: 10px;
  height: 5px;
  margin-top: 5px;
  margin-left: 4%;

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 15px;
    height: 15px;
    background-color: #8f95cc;
    border-radius: 50%;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 15px;
    height: 15px;
    background-color: #8f95cc;
    border-radius: 50%;
    cursor: pointer;
  }
`

export const SliderContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const DurationContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const DurationSlider = styled.input`
  width: 20rem;
  -webkit-appearance: none;
  background-color: #8f95cc;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
  border-radius: 10px;
  height: 5px;
  margin-top: 8%;
  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px; /* Increased width */
    height: 20px; /* Increased height */
    background-color: #8f95cc;
    border-radius: 50%;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 20px; /* Increased width */
    height: 20px; /* Increased height */
    background-color: #8f95cc;
    border-radius: 50%;
    cursor: pointer;
  }
`
