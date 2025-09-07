import { Product } from "../models/product.js";

export const getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "상품 추가",
    path: "/admin/add-product",

    // hbs layout
    formCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

export const postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

export const getProducts = (req, res, next) => {
  const products = Product.fetchAll();

  // 템플릿으로 데이터 전달
  res.render("shop", {
    pageTitle: "상점",
    productItems: products,
    path: "/",
    hasProducts: products.length > 0,

    // hbs layout
    activeShop: true,
    productCSS: true,
  });
};
