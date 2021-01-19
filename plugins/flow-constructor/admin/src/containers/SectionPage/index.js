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
              data={{parent_section: section}}
              updateSection={() => getSectionDetail()}
            />
          )}

          {/* <div className="row">
            <Block
              title="UseCases"
              description="Configure the Flow Constructor"
              style={{ marginBottom: 16 }}
              action={handleToggle}
            >
              <div className="row">
                <div className="col-md-3">
                  <UseCaseCard
                    title="Lease classification use section"
                    edit={handleToggle}
                  />
                </div>
                <div className="col-md-3">
                  <UseCaseCard title="UseCase name" edit={handleToggle} />
                </div>
              </div>
            </Block>
          </div> */}

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

export default memo(SectionPage);
