import styled, {keyframes} from 'styled-components';

export default styled.div`
  flex-basis: percentage(1/3);
  width: percentage(1/3);
  padding: 0 10px;
  box-sizing: border-box;
  
  @media (max-width: 900px, min-width: 600px) {
    & {
      flex-basis: 50%;
      width: 50%;
    }
  }
  
  @media (max-width: 600px, min-width: 400px) {
    & {
      flex-basis: 100%;
      width: 100%;
    }
  }
`