export const products = [];

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
  console.log(req.body);
  products.push({ title: req.body.title });
  res.redirect("/");
};

export const getProducts = (req, res, next) => {
  const productItems = products;

  // 템플릿으로 데이터 전달
  res.render("shop", {
    pageTitle: "상점",
    productItems: productItems,
    path: "/",
    hasProducts: productItems.length > 0,

    // hbs layout
    activeShop: true,
    productCSS: true,
  });
};
