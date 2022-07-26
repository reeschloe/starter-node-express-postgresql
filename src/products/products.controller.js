const productsService = require("./products.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function productExists(req, res, next) {
  const product = await productsService.read(req.params.productId);
  if (product) {
    res.locals.product = product;
    return next();
  }
  next({status: 404, message: `Product cannot be found.`})
}

function read(req, res) {
  const { product: data } = res.locals;
  res.json({ data });
}

async function list(req, res, next) {
  const data = await productsService.list()
  res.json({data})
}

async function listOutOfStockCount(req, res) {
  const data = await productsService.listOutOfStockCount();
  res.json({data});
}

async function listPriceSummary(req, res) {
  const data = await productsService.listPriceSummary();
  res.json({data});
}

async function listTotalWeightByProduct(req, res) {
  const data = await productsService.listTotalWeightByProduct();
  res.json({data});
}

module.exports = {
  read: [asyncErrorBoundary(productExists), read],
  list: asyncErrorBoundary(list),
  listOutOfStockCount: asyncErrorBoundary(listOutOfStockCount),
  listPriceSummary: asyncErrorBoundary(listPriceSummary),
  listTotalWeightByProduct: asyncErrorBoundary(listTotalWeightByProduct),
};
