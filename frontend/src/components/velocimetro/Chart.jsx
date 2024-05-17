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
      
      const data_filter = response.filter(item => item.produto !== null);
      const data = data_filter.map(item => [item.produto.tipo, item.quantidade]);
      const quantidadePorTipo = data.reduce((acc, [tipo, quantidade]) => {
        acc[tipo] = (acc[tipo] || 0) + quantidade;
        return acc;
      }, {});
      
      const categoriasArray = Object.entries(quantidadePorTipo);
      categoriasArray.unshift(['categorias', 'quantidade']);
      setCategorias(categoriasArray);
    });
  }, []);

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
