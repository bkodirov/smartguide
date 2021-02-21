import styled from "styled-components";

export const Answer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  .node_card {
    display: block;
    padding: 5px;
    background-color: ${(props) => props.color};
    text-align: center;
    color: #fff;
  }
  .answer_block {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 50%;
    padding: 0 10px;
    cursor: pointer;
    border-bottom: 1px solid #e3e9f3;
    font-size: 1.3rem;
    line-height: 1.8rem;
    &:hover {
      background-color: rgb(247, 248, 248);
    }
    a {
      display: block;
      width: 100%;
      padding: 10px 0;
      color: #333740;
      text-decoration: none;
    }
    svg {
      margin: 0 5px;
    }
  }
  .arrow {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 10px;
    font-size: 20px;
  }
`;
