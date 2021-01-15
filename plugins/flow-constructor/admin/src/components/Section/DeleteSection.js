import React, { useState } from "react";
import { request, PopUpWarning } from "strapi-helper-plugin";

export default function DeleteSection({
  isOpen,
  handleToggle,
  updateSection,
  data,
}) {
  const [loading, setLoading] = useState();

  const sectionDelete = async () => {
    setLoading(true);
    try {
      const response = await request(`/sections/${data._id}`, {
        method: "DELETE",
      });
      setLoading(false);
      strapi.notification.success("Deleted");
      handleClose();
      updateSection();
    } catch (error) {
      setLoading(false);
      strapi.notification.error("An error occured");
      console.error(error);
    }
  };

  return (
    <PopUpWarning
      isOpen={isOpen}
      toggleModal={handleToggle}
      isConfirmButtonLoading={loading}
      onConfirm={sectionDelete}
    />
  );
}
