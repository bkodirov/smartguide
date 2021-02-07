import React, { memo, useState, useEffect, useContext } from "react";
import { request } from "strapi-helper-plugin";
import Background from "../../components/Card/Background";
import Container from "../../components/Card/CardContainer";
import { Header } from "@buffetjs/custom";
import { useParams } from "react-router-dom";
import NodeSection from "../NodeSection";
import Context from "../../contexts/Context";

function UseCasePage() {
  const { state, dispatch } = useContext(Context);
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [useCase, setUseCase] = useState({});

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
                onClick: () => dispatch({ type: "toggle_add_modal" }),
                color: "primary",
                type: "submit",
                icon: true,
              },
            ]}
          />
          {!loading && (
            <NodeSection
              data={useCase}
              updateSection={() => getUseCaseDetail()}
            />
          )}
        </div>
      </Container>
    </Background>
  );
}

export default memo(UseCasePage);
