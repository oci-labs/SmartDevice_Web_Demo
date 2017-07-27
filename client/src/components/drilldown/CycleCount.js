import React from "react";
import "./CycleCount.css";
import { CYCLE_COUNT_THRESHOLD } from "../../config";

const CycleCount = ({ cycleCount }) => {
  const gaugeStyle = {
    width: cycleCount / CYCLE_COUNT_THRESHOLD * 100 + "%"
  };
  return (
    <div className="cycleCountContainer">
      <div className="cycleCount">
        <div className="cycleCountGauge" style={gaugeStyle} />
      </div>
      <div className="cycleCountLabel">
        Cycle Count: {cycleCount}
      </div>
    </div>
  );
};

export default CycleCount;
