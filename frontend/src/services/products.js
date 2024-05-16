import axios from "axios";

const productsFetch = axios.create({
    withCredentials : true, baseURL: "http://localhost:5000/api/v1"
}
)

async function getProducts () {
    return await productsFetch.get('/products/')
    .then(res => {
      console.log(res.data.products)
        return res.data.products;
      });
}

async function getCategories () {
  return await productsFetch.get('/products/category/')
  .then(res => {
          return res.data.contagem;
    });
}

export {getProducts, getCategories}