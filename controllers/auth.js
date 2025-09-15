const getLogin = async (req, res, next) => {
  try {
    res.render("auth/login", {
      path: "/login",
      pageTitle: "Login",
    });
  } catch (err) {
    console.error(err);
  }
};

export default getLogin;
