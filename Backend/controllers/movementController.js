import Movement from "../models/Movement.js";
import { StatusCodes } from "http-status-codes";

const getMovements = async (req, res) => {
  let result = Movement.find();

  const movements = await result;

  res.status(StatusCodes.OK).json({ movements });
};

const getMovementsDetails = async (req, res) => {
  let result = Movement.find().populate("produto");

  const movements = await result;

  res.status(StatusCodes.OK).json({ movements });
};

const getTotalQuantityByTypeAndMonth = async (req, res) => {
  const type = "entrada";
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const startDate = new Date(Date.UTC(currentYear, currentMonth - 1, 1));
  const endDate = new Date(
    Date.UTC(currentYear, currentMonth, 0, 23, 59, 59, 999)
  );

  const pastMonthStartDate = new Date(
    Date.UTC(currentYear, currentMonth - 2, 1)
  );
  const pastMonthEndDate = new Date(
    Date.UTC(currentYear, currentMonth - 1, 0, 23, 59, 59, 999)
  );

  const currentMonthResult = await Movement.aggregate([
    {
      $match: {
        tipo: type,
        data: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    {
      $group: {
        _id: null,
        vendasRealizadas: { $sum: "$quantidade" },
        previsaoFaturamentoTotal: {
          $sum: { $multiply: ["$quantidade", "$preco"] },
        },
      },
    },
  ]);

  const pastMonthResult = await Movement.aggregate([
    {
      $match: {
        tipo: type,
        data: {
          $gte: pastMonthStartDate,
          $lte: pastMonthEndDate,
        },
      },
    },
    {
      $group: {
        _id: null,
        vendasRealizadas: { $sum: "$quantidade" },
        previsaoFaturamentoTotal: {
          $sum: { $multiply: ["$quantidade", "$preco"] },
        },
      },
    },
  ]);

  const currentVendasRealizadas =
    currentMonthResult.length > 0 ? currentMonthResult[0].vendasRealizadas : 0;
  const currentPrevisaoFaturamentoTotal =
    currentMonthResult.length > 0
      ? currentMonthResult[0].previsaoFaturamentoTotal
      : 0;

  const pastVendasRealizadas =
    pastMonthResult.length > 0 ? pastMonthResult[0].vendasRealizadas : 0;
  const pastPrevisaoFaturamentoTotal =
    pastMonthResult.length > 0
      ? pastMonthResult[0].previsaoFaturamentoTotal
      : 0;

  const diffVendasRealizadas = currentVendasRealizadas - pastVendasRealizadas;
  const diffPrevisaoFaturamentoTotal =
    currentPrevisaoFaturamentoTotal - pastPrevisaoFaturamentoTotal;

  const situacaoDoEstoquePorcentagem = (currentVendasRealizadas / 500) * 100;

  const jsonResponse = {
    mesAtual: {
      vendasRealizadas: currentVendasRealizadas,
      previsaoFaturamentoTotal: currentPrevisaoFaturamentoTotal,
    },
    mesPassado: {
      vendasRealizadas: pastVendasRealizadas,
      previsaoFaturamentoTotal: pastPrevisaoFaturamentoTotal,
    },
    diferenca: {
      vendasRealizadas: diffVendasRealizadas,
      previsaoFaturamentoTotal: diffPrevisaoFaturamentoTotal,
    },
    situacaoDoEstoquePorcentagem,
  };

  res.status(StatusCodes.OK).json(jsonResponse);
};

export { getMovements, getTotalQuantityByTypeAndMonth, getMovementsDetails };
