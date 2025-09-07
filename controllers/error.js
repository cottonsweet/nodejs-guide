export const get404Controller = (req, res, next) => {
  res.status(404).render("404", {
    pageTitle: "404-Not Found Page dd",
    content: "페이지를 찾을 수 없습니다.",
  });
};
