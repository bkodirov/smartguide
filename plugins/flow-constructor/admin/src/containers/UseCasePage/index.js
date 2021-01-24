import React, {memo, useState, useEffect} from "react";
import Background from "../../components/Card/Background";
import Container from "../../components/Card/CardContainer";

import {ModalHeader} from "strapi-helper-plugin";

function handleClose(event) {

}

function createNewUseCase(event) {

}

function UseCase() {
  return (
    <Background>
      <Container>
        <ModalHeader
          withBackButton
          headerBreadcrumbs={["Use Case"]}
          onClickGoBack={handleClose}
        />

      </Container>
    </Background>
  );
}

export default memo(UseCase);
