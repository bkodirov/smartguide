import styled from "styled-components";

export const Answer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 5px;
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
`;
