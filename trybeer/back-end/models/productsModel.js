const conn = require('./connection');

const createSalesProducts = async (salesPdts) => {
  const table = await conn().then((db) => db.getTable('sales_products'));

  salesPdts.forEach(async (sale) => {
    const { saleId, id, qtt } = sale;

    await table.insert([
      'sale_id',
      'product_id',
      'quantity',
    ]).values(saleId, id, qtt)
      .execute();
  });
};

const readSalesProducts = async (saleIdValue) => {
  const table = await conn().then((db) => db.getTable('sales_products'));

  return table
    .select([])
    .where('sale_id = :saleId')
    .bind('saleId', saleIdValue)
    .execute()
    .then(
      (sales) => sales.fetchAll()
        .map(([saleId, productId, quantity]) => ({ saleId, productId, quantity })),
    );
};

const read = async () => {
  const table = await conn().then((db) => db.getTable('products'));
  const products = await table.select([]).execute();

  return products.fetchAll().map(([id, name, price, urlImg]) => ({ id, name, price, urlImg }));
};

// IIFE para testes, ignorem!!!
// (async () => console.log(await read()))();

module.exports = {
  createSalesProducts,
  read,
  readSalesProducts,
};
