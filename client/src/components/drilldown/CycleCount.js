import React from "react";
import "./CycleCount.css";
import { CYCLE_COUNT_THRESHOLD } from "../../config";

const CycleCount = ({ cycleCount, limit }) => {
  const percentage = cycleCount / (limit ? limit : CYCLE_COUNT_THRESHOLD) * 100;
  const gaugeStyle = {
    width: percentage + "%",
    backgroundColor: percentage >= 100 ? "#d9534f" : percentage > 99 ? "#f7a104" : "#17a71d"
  };
  return (
    <div className="cycleCountContainer">
      <div className="cycleCount">
        <div className={`cycleCountGauge ${percentage > 80 ? 'warning' : ''}`} style={gaugeStyle} />
      </div>
      <div className="cycleCountLabel">
        Cycle Count: {cycleCount} / {limit}
      </div>
    </div>
  );
};

export default CycleCount;
