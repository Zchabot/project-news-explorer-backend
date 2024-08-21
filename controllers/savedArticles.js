const BadRequestError = require("../utils/Errors/BadRequestError");
const NotFoundError = require("../utils/Errors/NotFoundError");
const SavedArticle = require("../models/savedArticle");

const { BAD_REQUEST_MESSAGE, NOT_FOUND_MESSAGE } = require("../utils/errors");

const createArticle = (req, res, next) => {
  const ownerId = req.user._id;
  const { keyword, title, text, date, source, link, image } = req.body;
  SavedArticle.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: ownerId,
  })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        next(new BadRequestError(BAD_REQUEST_MESSAGE));
      } else {
        next(err);
      }
    });
};

const getArticles = (req, res, next) => {
  const owner = req.user._id;
  SavedArticle.find({ owner })
    .then((items) => res.send(items))
    .catch((err) => next(err));
};

const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  SavedArticle.findByIdAndDelete(articleId)
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError(NOT_FOUND_MESSAGE));
      } else if (err.name === "CastError") {
        next(new BadRequestError(BAD_REQUEST_MESSAGE));
      } else next(err);
    });
};

module.exports = { getArticles, createArticle, deleteArticle };
