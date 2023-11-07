import React from "react";
import { Chart } from 'react-google-charts';


class VelocimetroChart extends React.Component {
  render() {
    const data = [
      ['Label', 'Value'],
      ['Estoque', 72], 
    ];

    const options = {
      redFrom: 0, 
      redTo: 50,  
      yellowFrom: 50, 
      yellowTo: 75, 
      greenFrom: 75, 
      greenTo: 100, 
      minorTicks: 5, 
    };

    return (
      <Chart
        chartType="Gauge"
        width="100%"
        height="300px"
        data={data}
        options={options}
      />
    );
  }
}

export default VelocimetroChart;

