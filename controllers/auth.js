export const getLogin = async (req, res, next) => {
  const isLoggedIn = req.get("Cookie").split(";")[1].trim().split("=")[1];
  try {
    res.render("auth/login", {
      path: "/login",
      pageTitle: "Login",
      isAuthenticated: isLoggedIn,
    });
  } catch (err) {
    console.error(err);
  }
};

export const postLogin = async (req, res, next) => {
  res.setHeader("Set-Cookie", "loggedIn=true");
  res.redirect("/");
};
