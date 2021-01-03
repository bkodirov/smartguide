import React, {Component} from "react";
import styled, {keyframes} from 'styled-components';
import CardView from "./CardView";
import {Plus} from '@buffetjs/icons';

function AddCard() {
  return (
    <CardView>
      <Plus/>
    </CardView>
  );
}

function DataCard(props) {
  return (
    <CardView >
      <h3>{props.category}</h3>
      <h2>{props.title}</h2>
      <p>{props.excerpt}</p>
    </CardView>
  );
}

export {AddCard, DataCard};