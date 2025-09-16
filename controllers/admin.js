import Product from "../models/product.js";

export const getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    isAuthenticated: req.session.isLoggedIn,
  });
};

export const postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product({
    title,
    imageUrl,
    price,
    description,
    userId: req.session.user,
  });

  console.log(req.user);
  product
    .save()
    .then((result) => {
      // console.log(result);
      console.log("Created Product");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    // Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => console.log(err));
};

export const postEditProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  try {
    const editProduct = await Product.findById(prodId);
    editProduct.title = updatedTitle;
    editProduct.price = updatedPrice;
    editProduct.updatedImageUrl = updatedImageUrl;
    editProduct.updatedDesc = updatedDesc;
    await editProduct.save();
    console.log("Updated Product !");
    res.redirect("/admin/products");
  } catch (err) {
    console.error(err);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    console.log(products);
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
      isAuthenticated: req.session.isLoggedIn,
    });
  } catch (err) {
    console.error(err);
  }
};

export const postDeleteProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  try {
    const removeProductId = await Product.findByIdAndDelete(prodId);
    console.log("DESTROYED PRODUCT");
    res.redirect("/admin/products");
  } catch (err) {
    console.error(err);
  }
};
