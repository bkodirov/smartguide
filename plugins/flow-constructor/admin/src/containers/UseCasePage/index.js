import React, { memo, useState, useEffect } from "react";
import { request } from "strapi-helper-plugin";
import Background from "../../components/Card/Background";
import Container from "../../components/Card/CardContainer";
import { Header } from "@buffetjs/custom";
import { useParams } from "react-router-dom";
import NodeSection from "../NodeSection";

function UseCasePage() {
  const params = useParams();
  const [loading, setLoading] = useState();
  const [useCase, setUseCase] = useState({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddToggle = () => {
    setIsAddModalOpen(!isAddModalOpen);
  };

  const getUseCaseDetail = async () => {
    setLoading(true);
    try {
      const response = await request(`/use_cases/${params.id}`, {
        method: "GET",
      });
      setLoading(false);
      setUseCase(response);
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
              label: "Node",
            }}
            content="Managing flow constructors easy with us!"
            isLoading={loading}
            actions={[
              {
                label: "Create a Node",
                onClick: () => handleAddToggle(),
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
              handleAddToggle={() => handleAddToggle()}
              isAddModalOpen={isAddModalOpen}
            />
          )}
        </div>
      </Container>
    </Background>
  );
}

export default memo(UseCasePage);
