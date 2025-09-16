export const getLogin = async (req, res, next) => {
  // const isLoggedIn = req.get("Cookie").split(";")[1].trim().split("=")[1];

  console.log(req.session.isLoggedIn);
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
  req.session.isLoggedIn = true;
  res.redirect("/");
};
