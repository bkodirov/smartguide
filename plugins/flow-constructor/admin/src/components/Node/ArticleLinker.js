import React, {useState} from "react";
import {
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
  request
} from "strapi-helper-plugin";
import { Button, InputText, Label, Select } from "@buffetjs/core";

export default function LinkingNode({onSave, onClose}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchResult, setSearchResult] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const sendSearchRequest = async () => {
    setLoading(true)
    try {
      const articles = await request(`/articles?_term=${searchTerm}`, {
        method: "GET"
      });
      setSearchResult({
        data: articles,
        selectItems: articles.map(item => item.articleId)
      })
      setSelectedIndex(0)
      strapi.notification.success("Search is done");
    } catch (error) {
      setSearchResult()
      strapi.notification.error("An error occured");
      console.error(error);
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      isOpen={true}
      onToggle={onClose}
      onClosed={onClose}
    >
      <ModalHeader
        withBackButton
        headerBreadcrumbs={["Linking to the Article"]}
        onClickGoBack={onClose}
      />
      <ModalBody>
          <div className="col-md-6 mb-5">
            <Label htmlFor="question">Article</Label>
            <InputText
              name="search"
              placeholder="Search..."
              onChange={({target: {value}}) => setSearchTerm(value)}
              type="text"
              value={searchTerm}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  sendSearchRequest()
                }
              }}
            />
            {
              searchResult && <Select
                name="question"
                onChange={(event) => {
                  setSelectedIndex(event.target.selectedIndex)
                }}
                options={searchResult.selectItems}
                value={searchResult.selectItems[selectedIndex]}
              />
            }
          </div>
      </ModalBody>
      <ModalFooter>
        <section>
          <Button
            isLoading={loading}
            disabled={searchResult === undefined}
            color="success" onClick={() => {
            onSave(unlinkedNodes[selectedIndex], answer)
          }}>
            Save
          </Button>
        </section>
      </ModalFooter>
    </Modal>
  );
}
