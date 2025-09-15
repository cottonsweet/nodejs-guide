export const getLogin = async (req, res, next) => {
  try {
    res.render("auth/login", {
      path: "/login",
      pageTitle: "Login",
      isAuthenticated: req.isLoggedIn,
    });
  } catch (err) {
    console.error(err);
  }
};

export const postLogin = async (req, res, next) => {
  req.isLoggedIn = true;
  res.redirect("/");
};
