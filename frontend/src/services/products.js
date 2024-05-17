import axios from "axios";

const productsFetch = axios.create({
  withCredentials: true, baseURL: "http://localhost:5000/api/v1"
});

async function getProducts() {
  return await productsFetch.get('/products/')
    .then(res => {
      return res.data.products;
    });
}

async function buyProduct(product) {
  const produto = {
    productId: product.id,
    quantidade: product.quantidade
  }

  return await productsFetch.post('/movements/', produto)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

async function updateProduct(product, id) {
  return await productsFetch.patch(`/products/${id}`, product)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

async function getCategories() {
  return await productsFetch.get('/movements/currentUser/')
    .then(res => {
      return res.data.movements;
    });
}

async function createProduct(product) {
  return await productsFetch.post(`/products/`, product)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

async function addImage(file, productId) {
  var form = new FormData();

  form.append('imagem', file);

  return await productsFetch.post(`/products/uploads/${productId}`, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).then(res => {
    return res;
  })
    .catch((err) => {
      return Promise.reject(err);
    });
}

export { getProducts, getCategories, updateProduct, createProduct, addImage, buyProduct }