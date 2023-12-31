import React from "react";
import { Chart } from "react-google-charts";

const PieChart = () => {
  const data = [
    ["Categoria", "Quantidade"],
    ["Produtos congelados", 20],
    ["Produtos perecíveis", 15],
    ["Bebidas", 10],
    ["Produtos de Higiene", 9],
    ["Produtos de Limpeza", 7],
  ];

  const options = {
    title: "Composição do Estoque",
    is3D: true,
  };

  return (
    <Chart
      chartType="PieChart"
      width={"100%"}
      height={"400px"}
      data={data}
      options={options}
    />
  );
};

export default PieChart;
