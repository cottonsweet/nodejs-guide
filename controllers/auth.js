import User from "../models/user.js";

export const getLogin = async (req, res, next) => {
  try {
    res.render("auth/login", {
      path: "/login",
      pageTitle: "Login",
      isAuthenticated: false,
    });
  } catch (err) {
    console.error(err);
  }
};

export const postLogin = async (req, res, next) => {
  try {
    const user = await User.findById("68c6b0d194a3468888dc8ea0");
    if (user) {
      req.session.isLoggedIn = true;
      req.session.user = user;
      res.redirect("/");
    }
  } catch (err) {
    console.error(err);
  }
};

export const getSignup = async (req, res, next) => {
  try {
    res.render("auth/signup", {
      path: "/signup",
      pageTitle: "Signup",
      isAuthenticated: false,
    });
  } catch (err) {
    console.error(err);
  }
};

export const postSignup = (req, res, next) => {};

export const postLogout = async (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
