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

  const getCardSectionDetail = async () => {
    setLoading(true);
    try {
      const response = await request(`/cards/${params.id}`, {
        method: "GET",
      });
      setLoading(false);
      setSection(response);
      console.log("getCardSectionDetail => ", response);
    } catch (error) {
      setLoading(false);
      strapi.notification.error("An error occured");
    }
  };

  useEffect(() => {
    getCardSectionDetail();
  }, []);

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
              updateSection={() => getCardSectionDetail()}
              recursive
            />
          )}

          {!loading && (
            <UseCaseSection
              data={{ parent_card: card }}
              updateSection={() => getCardSectionDetail()}
            />
          )}

          {/* <div className="row">
            <Block title="Tags" description="" style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <Option label="Tag" margin="0 10px 6px 0" />
                {tags.map((tag, index) => (
                  <Option key={index} label={tag} margin="0 10px 6px 0" />
                ))}
              </div>
              <div className="row">
                <div className="col-md-6">
                  <form onSubmit={addTags}>
                    <InputText
                      name="tag"
                      onChange={({ target: { value } }) => {
                        setValue(value);
                      }}
                      placeholder="tags..."
                      type="text"
                      value={val}
                    />
                  </form>
                </div>
              </div>
            </Block>
          </div> */}
        </div>
      </Container>
    </Background>
  );
}

export default memo(CardSectionPage);
