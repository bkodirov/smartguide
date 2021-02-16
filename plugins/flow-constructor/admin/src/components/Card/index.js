import React from "react";
import {CardView, UseCaseCardView} from "./CardView";
import {Button} from "@buffetjs/core";
import pluginId from "../../pluginId";
import {Link} from "react-router-dom";

function AddCard({edit}) {
  return (
    <CardView>
      <div className="icon_wrapper" onClick={edit}>
        <svg
          aria-hidden="true"
          focusable="false"
          className="svg-inline--fa fa-plus fa-w-14"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            fill="#787e8f"
            d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
          ></path>
        </svg>
      </div>
    </CardView>
  );
}

function DataCard({title, excerpt, edit, cardId}) {
  return (
    <CardView>
      <Link to={`/plugins/${pluginId}/cards/${cardId}`}>
        <h3>{title}</h3>
        <div className="card_body">
          <p>{excerpt}</p>
        </div>
      </Link>
        <div className="card_footer">
          <Button color="primary" label="Edit" onClick={edit}/>
        </div>
    </CardView>
  );
}

function UseCaseCard({title, edit, useCaseId}) {
  return (
    <UseCaseCardView>
      <Link to={`/plugins/${pluginId}/use_case/${useCaseId}`} className="card_title">
        <h3>{title}</h3>
      </Link>
      <div className="card_footer">
        <Button color="primary" label="Edit" onClick={edit}/>
      </div>
    </UseCaseCardView>
  );
}

export {AddCard, DataCard, UseCaseCard};
