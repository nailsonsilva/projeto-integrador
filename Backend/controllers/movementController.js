import Movement from "../models/Movement.js";
import { StatusCodes } from "http-status-codes";
import Product from "../models/Product.js";
import BadRequestError from "../errors/bad-request.js";
import mongoose from "mongoose";

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

const getMovementsByCurrentUser = async (req, res) => {
  let result = Movement.find({ userId: req.user.userId }).populate("produto");

  const movements = await result;

  res.status(StatusCodes.OK).json({ movements });
};

const createOrUpdateMovement = async (req, res) => {
  const { quantidade: movementQuantity, productId } = req.body;
  const userId = req.user.userId;

  const session = await mongoose.startSession();
  session.startTransaction();

  const currentUTCDate = new Date();
  currentUTCDate.setUTCHours(currentUTCDate.getUTCHours() - 3);
  const utcTimestamp = currentUTCDate.getTime();

  try {
    const product = await Product.findOne({ _id: productId }).session(session);

    let movement = await Movement.findOne({ produto: productId }).session(
      session
    );

    if (!movement) {
      if (product.quantidade < movementQuantity) {
        throw new BadRequestError("Estoque insuficiente.");
      }

      const movimentationData = {
        produto: productId,
        quantidade: movementQuantity,
        userId: userId,
        data: new Date(utcTimestamp),
      };

      const newQuantity = product.quantidade - movementQuantity;
      await Product.findOneAndUpdate(
        { _id: productId },
        { quantidade: newQuantity },
        { new: true, runValidators: true, session: session }
      );

      movement = await Movement.create([movimentationData], {
        session: session,
      });
    } else {
      if (movementQuantity > movement.quantidade) {
        const difference = movementQuantity - movement.quantidade;
        const newQuantity = product.quantidade - difference;

        if (newQuantity < 0) {
          throw new BadRequestError("Estoque insuficiente.");
        }

        await Product.findOneAndUpdate(
          { _id: productId },
          { quantidade: newQuantity },
          { new: true, runValidators: true, session: session }
        );
      }

      movement = await Movement.findOneAndUpdate(
        { _id: movement._id },
        { quantidade: movementQuantity },
        { new: true, runValidators: true, session: session }
      );
    }

    await session.commitTransaction();
    session.endSession();

    return res.json(movement);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: error.message });
  }
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

export {
  getMovements,
  getTotalQuantityByTypeAndMonth,
  getMovementsDetails,
  getMovementsByCurrentUser,
  createOrUpdateMovement,
};
