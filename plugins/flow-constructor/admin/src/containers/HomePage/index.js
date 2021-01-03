import React, {memo, Component} from "react";
import {request} from "strapi-helper-plugin";
import PropTypes from "prop-types";
import {AddCard, DataCard} from "../../components/Card";
import Background from "../../components/Card/Background";
import Container from "../../components/Card/CardContainer";

class HomePage extends Component {
  state = {
    analyzing: false,
    analysis: null
  };

  render() {
    return (
      <Background>
        <Container>
          <DataCard category='Leasing' title='MY TITLE' excerpt='Long long long long desc'/>
          <AddCard/>
        </Container>
      </Background>
    );
  };
}

export default memo(HomePage);