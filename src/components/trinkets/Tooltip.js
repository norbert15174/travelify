import React from "react";
import ReactTooltip from "react-tooltip";
import "./tooltip.css";

const Tooltip = ({ id, place, text }) => (
  <ReactTooltip
    className="customTheme"
    id={id}
    place={place}
    effect="solid"
    delayShow={500}
  >
    {text}
  </ReactTooltip>
);

export default Tooltip;
