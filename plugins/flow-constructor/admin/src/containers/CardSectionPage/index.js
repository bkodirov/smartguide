import React, { memo, useState, useEffect } from "react";
import { request } from "strapi-helper-plugin";
import Background from "../../components/Card/Background";
import Container from "../../components/Card/CardContainer";
import { Header } from "@buffetjs/custom";
import { useParams } from "react-router-dom";
import CardSection from "../CardSection";
import UseCaseSection from "../UseCaseSection";

function CardSectionPage() {
  const params = useParams();
  const [loading, setLoading] = useState();
  const [card, setSection] = useState({});

  const getCardDetail = async () => {
    setLoading(true);
    try {
      const response = await request(`/cards/${params.id}`, {
        method: "GET",
      });
      setLoading(false);
      setSection(response);
      console.log("getCardDetail => ", response);
    } catch (error) {
      setLoading(false);
      strapi.notification.error("An error occured");
    }
  };

  useEffect(() => {
    getCardDetail();
  }, [params]);

  return (
    <Background>
      <Container>
        <div className={"container-fluid"} style={{ padding: "18px 30px" }}>
          <Header
            title={{
              label: card.title,
            }}
            content="Managing flow constructors easy with us!"
            isLoading={loading}
          />
          {!loading && (
            <CardSection
              data={{ parent_card: card }}
              updateSection={() => getCardDetail()}
              recursive
            />
          )}
          {!loading && (
            <UseCaseSection
              data={{ parent_card: card }}
              updateSection={() => getCardDetail()}
            />
          )}
        </div>
      </Container>
    </Background>
  );
}

export default memo(CardSectionPage);
