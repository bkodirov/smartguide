import React from "react";
import { IconLinks } from "@buffetjs/core";
import { Row } from './Row'

export default function ListRow({ icon, description, links, name, onClick }) {
  const styles = {
    name: {
      textTransform: "capitalize",
    },
  };

  return (
    <Row onClick={onClick}>
      <td>{icon}</td>
      <td>
        <p style={styles.name}>{name}</p>
      </td>
      <td>
        <p>{description}</p>
      </td>
      <td>
        <IconLinks links={links} />
      </td>
    </Row>
  );
}
