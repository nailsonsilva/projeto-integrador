import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { getCategories } from "../../services/products";

const PieChart = () => {
  let data = [

  ];

  const options = {
    title: "Composição do Estoque",
    is3D: true,
  };
  const [categorias, setCategorias] = useState([])
  useEffect(() => {
    getCategories().then(response => {
      data = response.map (response=>[response.tipo,response.quantidade])
      data.unshift(['categorias', 'quantidade'])
     setCategorias(data)
      
    })
  },[getCategories])

  console.log(categorias)

  return (
    <Chart
      chartType="PieChart"
      width={"100%"}
      height={"400px"}
      data={categorias}
      options={options}
    />
  );
};

export default PieChart;
