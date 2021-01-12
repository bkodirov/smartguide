import React, { memo } from "react";
import PropTypes from "prop-types";
import { Wrapper, Sub, SubHeader } from "./components";
import { Button } from "@buffetjs/core";

const Block = ({ children, description, style, title, action }) => (
  <div className="col-md-12">
    <Wrapper style={style}>
      <SubHeader>
        <Sub>
          {!!title && <p>{title} </p>} {!!description && <p>{description} </p>}
        </Sub>
        {action ? (
          <Button color="secondary" icon={true} label="New" onClick={action} />
        ) : (
          ""
        )}
      </SubHeader>
      {children}
    </Wrapper>
  </div>
);

Block.defaultProps = {
  children: null,
  description: null,
  style: {},
  title: null,
};
Block.propTypes = {
  children: PropTypes.any,
  description: PropTypes.string,
  style: PropTypes.object,
  title: PropTypes.string,
};

export default memo(Block);
