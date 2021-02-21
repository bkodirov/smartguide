import React, { memo, useState, useEffect } from "react";
import { request } from "strapi-helper-plugin";
import Background from "../../components/Card/Background";
import Container from "../../components/Card/CardContainer";
import { Header } from "@buffetjs/custom";
import { useParams } from "react-router-dom";
import CardSection from "../CardSection";

function SectionPage() {
  const params = useParams();
  const [loading, setLoading] = useState();
  const [section, setSection] = useState({});

  const getSectionDetail = async () => {
    setLoading(true);
    try {
      const response = await request(`/sections/${params.id}`, {
        method: "GET",
      });
      setLoading(false);
      setSection(response);
      console.log("getSectionDetail => ", response);
    } catch (error) {
      setLoading(false);
      strapi.notification.error("An error occured");
    }
  };

  useEffect(() => {
    getSectionDetail();
  }, []);

  return (
    <Background>
      <Container>
        <div className={"container-fluid"} style={{ padding: "18px 30px" }}>
          <Header
            title={{
              label: section.title,
            }}
            content="Managing flow constructors easy with us!"
            isLoading={loading}
          />
          {!loading && (
            <CardSection
              data={{ parent_section: section }}
              updateSection={() => getSectionDetail()}
            />
          )}
        </div>
      </Container>
    </Background>
  );
}

export default memo(SectionPage);
