import Product from "../models/product.js";
import Order from "../models/order.js";

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    if (products) {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
        isAuthenticated: req.isLoggedIn,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

export const getProduct = async (req, res, next) => {
  const prodId = req.params.productId;
  try {
    const product = await Product.findById(prodId);
    res.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path: "/products",
    });
  } catch (err) {
    console.error(err);
  }
};

export const getIndex = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
        isAuthenticated: req.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCart = async (req, res, next) => {
  try {
    const user = await req.user.populate("cart.items.productId");
    console.log(user.cart.items);
    const products = user.cart.items;
    if (products) {
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products,
        isAuthenticated: req.isLoggedIn,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

export const postCart = async (req, res, next) => {
  const prodId = req.body.productId;
  try {
    const product = await Product.findById(prodId);
    if (product) {
      req.user.addToCart(product);
      res.redirect("/cart");
    }
  } catch (err) {
    console.error(err);
  }
};

export const postCartDeleteProduct = async (req, res, next) => {
  try {
    const prodId = req.body.productId;
    await req.user.removeFromCart(prodId);
    res.redirect("/cart");
  } catch (err) {
    console.error(err);
  }
};

export const postOrder = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.redirect("/");
    }

    const user = await req.user.populate("cart.items.productId");
    const products = user.cart.items.map((i) => {
      return {
        productData: { ...i.productId._doc },
        quantity: i.quantity,
      };
    });

    const order = new Order({
      user: {
        name: req.user.name,
        userId: req.user._id,
      },
      products,
    });

    await order.save();
    req.user.cart.items = [];
    await req.user.save();
    res.redirect("/orders");
  } catch (err) {
    console.error(err);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ "user.userId": req.user._id });
    if (orders) {
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: orders,
        isAuthenticated: req.isLoggedIn,
      });
    }
  } catch (err) {
    console.error(err);
  }
};
