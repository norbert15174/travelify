import React from "react";
import ReactTooltip from "react-tooltip";
import "./tooltip.css";

const Tooltip = ({id, place, text}) => (
    <ReactTooltip className="customTheme" id={id} place={place} effect="solid">
        {text}
    </ReactTooltip>
);

export default Tooltip;