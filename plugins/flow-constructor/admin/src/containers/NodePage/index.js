import React, { memo, useState, useEffect } from "react";
import { request } from "strapi-helper-plugin";
import Background from "../../components/Card/Background";
import Container from "../../components/Card/CardContainer";
import { Header } from "@buffetjs/custom";
import { useParams } from "react-router-dom";
import Node from "../../components/Node";

function NodePage() {
  const params = useParams();
  const [loading, setLoading] = useState();
  const [node, setNode] = useState({});

  const getNodeDetail = async () => {
    setLoading(true);
    try {
      const response = await request(`/nodes/${params.id}`, {
        method: "GET",
      });
      setLoading(false);
      setNode(response);
      console.log("getNodeDetail => ", response);
    } catch (error) {
      setLoading(false);
      strapi.notification.error("An error occured");
    }
  };

  // useEffect(() => {
  //   getNodeDetail();
  // }, []);

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
                onClick: () => alert("Create button clicked"),
                color: "primary",
                type: "submit",
                icon: true,
              },
            ]}
          />
          {!loading && <Node />}
        </div>
      </Container>
    </Background>
  );
}

export default memo(NodePage);
