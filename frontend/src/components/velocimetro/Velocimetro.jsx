import React from 'react';
import Speedometer from 'react-d3-speedometer'; 

const Velocimetro = ({ value = 75 }) => {
  return (
    <div>
      <Speedometer
        value={value}
        minValue={0}
        maxValue={100}
        needleColor="blue"
        startColor="red"
        segments={3}
      />
    </div>
   
  );
};

export default Velocimetro;
