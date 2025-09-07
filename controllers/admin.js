import { Product } from "../models/product.js";

export const getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

export const postAddProduct = (req, res, next) => {
  const { title, imageUrl, description, price } = req.body;
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect("/");
};

export const getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};
