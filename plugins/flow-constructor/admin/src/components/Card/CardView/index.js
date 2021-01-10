import styled from "styled-components";

const CardView = styled.div`
  position: relative;
  min-height: 216px;
  margin-bottom: 3.6rem;
  padding: 1.2rem 1.5rem;
  padding-bottom: 0;
  background-color: #fff;
  box-shadow: 0 2px 4px #e3e9f3;
  -webkit-font-smoothing: antialiased;

  .icon_wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 202px;
    font-size: 56px;
    cursor: pointer;
    svg {
      fill: #787e8f !important;
    }
  }

  .card_title {
    display: flex;
    align-items: center;
    height: 36px;
    border-bottom: 1px solid #f3f3f7;
    h3 {
      font-size: 13px;
      line-height: 36px;
      font-weight: 600;
      text-transform: uppercase;
      -webkit-letter-spacing: 0.5px;
      -moz-letter-spacing: 0.5px;
      -ms-letter-spacing: 0.5px;
      letter-spacing: 0.5px;
    }
  }

  .card_body {
    height: 54px;
    margin-top: 27px;
    margin-bottom: 9px;
    -webkit-font-smoothing: antialiased;
    p {
      margin: 0;
      font-size: 13px;
      font-weight: 400;
    }
  }

  .card_footer {
    position: absolute;
    bottom: 0;
    left: 0;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    height: 45px;
    padding: 0.9rem 1.5rem 1rem;
    background-color: #fafafb;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-flex-direction: row-reverse;
    -ms-flex-direction: row-reverse;
    flex-direction: row-reverse;
    cursor: initial;
  }
`;

export default CardView;
