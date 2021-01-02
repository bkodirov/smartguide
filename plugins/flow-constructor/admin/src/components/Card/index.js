import React, {Component} from "react";
import PropTypes from "prop-types";

class Card extends Component {
  state = {
    file: null,
    type: null,
    options: {
      filename: null
    }
  };
}

export default Card;