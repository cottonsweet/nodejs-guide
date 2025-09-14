import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const p = path.join(__dirname, "..", "data", "cart.json");

export class Cart {
  static addProduct(id, productPrice, cb) {
    // Fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        try {
          cart = JSON.parse(fileContent);
          // cart.products가 없으면 빈 배열로 초기화
          if (!cart.products) {
            cart.products = [];
          }
          if (!cart.totalPrice) {
            cart.totalPrice = 0;
          }
        } catch (parseErr) {
          console.log("JSON parse error:", parseErr);
          cart = { products: [], totalPrice: 0 };
        }
      }
      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      // Add new product/ increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        if (err) {
          console.log(err);
        }
        if (cb) {
          cb();
        }
      });
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }
      try {
        const updatedCart = { ...JSON.parse(fileContent) };
        // products 배열이 없으면 빈 배열로 초기화
        if (!updatedCart.products) {
          updatedCart.products = [];
        }
        const product = updatedCart.products.find((prod) => prod.id === id);
        if (!product) {
          return;
        }
        const productQty = product.qty;
        updatedCart.products = updatedCart.products.filter(
          (prod) => prod.id !== id
        );
        updatedCart.totalPrice =
          updatedCart.totalPrice - productPrice * productQty;

        fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
          console.log(err);
        });
      } catch (parseErr) {
        console.log("JSON parse error in deleteProduct:", parseErr);
      }
    });
  }

  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb(null);
        return;
      }
      try {
        const cart = JSON.parse(fileContent);
        // cart.products가 없으면 빈 배열로 초기화
        if (!cart.products) {
          cart.products = [];
        }
        if (!cart.totalPrice) {
          cart.totalPrice = 0;
        }
        cb(cart);
      } catch (parseErr) {
        console.log("JSON parse error in getCart:", parseErr);
        cb(null);
      }
    });
  }
}
