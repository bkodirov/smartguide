import React, { memo, useState, useEffect } from "react";
import { request } from "strapi-helper-plugin";
import Background from "../../components/Card/Background";
import Container from "../../components/Card/CardContainer";
import { Header } from "@buffetjs/custom";
import { useParams } from "react-router-dom";
import FlowDiagram from "../../components/FlowDiagram";
import { AddNode } from "../../components/Node";

function UseCasePage() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [useCase, setUseCase] = useState({});
  const [addingNode, updateAddingNode] = useState(false);

  const getUseCaseDetail = async () => {
    setLoading(true);
    try {
      const response = await request(`/use_cases/${params.id}`, {
        method: "GET",
      });
      setUseCase(response);
      setLoading(false);
      console.log("getUseCaseDetail => ", response);
    } catch (error) {
      setLoading(false);
      strapi.notification.error("An error occured");
    }
  };

  useEffect(() => {
    getUseCaseDetail();
  }, []);

  return (
    <Background>
      <Container>
        <div className={"container-fluid"} style={{ padding: "18px 30px" }}>
          <Header
            title={{
              label: useCase.title,
            }}
            isLoading={loading}
            actions={[
              {
                label: "Create a Node",
                onClick: () => updateAddingNode(true),
                color: "primary",
                type: "submit",
                icon: true,
              },
            ]}
          />
          {!loading && (
            <FlowDiagram
              data={useCase}
              updateSection={() => getUseCaseDetail()}
            />
          )}
          {addingNode && (
            <AddNode
              updateSection={() => getUseCaseDetail()}
              useCaseId={useCase._id}
              nodes={useCase.nodes}
              tags={useCase.tags}
              handleClose={() => updateAddingNode(false)}
            />
          )}
        </div>
      </Container>
    </Background>
  );
}

export default memo(UseCasePage);
