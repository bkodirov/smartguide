import React, {Component} from "react";
import styled, {keyframes} from 'styled-components';
import CardColumn from '../CardColumn';

const Article = styled.article`
 background: #FFF;
  margin: 0 0 20px;
  padding: 20px;
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(#000, 0.2);
  cursor: pointer;
  transition: 0.3s ease;
  
  &:hover {
    box-shadow: 0 2px 4px rgba(#000, 0.2),
      0 4px 8px rgba(#000, 0.2);
  }
  
  &:active {
    box-shadow: none;
    transform-origin: center;
    transform: scale(0.98);
  }
  
  &__category {
    display: inline-block;
    // background: #212121;
    padding: 8px 10px;
    margin: 0 0 10px;
    color: #FFF;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.075rem;
    text-transform: uppercase;
  }

  &__date {}

  &__excerpt {
    color: #666;
    line-height: 1.5rem;
    font-size: 0.875rem;
  }

  &__title {
    margin: 0 0 10px;
    color: #444;
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.75rem;
  }
`;

export default function Card(props) {
  return (
    <CardColumn>
      <Article>
        <h3>{props.category}</h3>
        <h2>{props.title}</h2>
        <p>{props.excerpt}</p>
      </Article>
    </CardColumn>
  )
};
