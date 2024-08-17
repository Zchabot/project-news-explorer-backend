const BadRequestError = require("../utils/Errors/BadRequestError");
const NotFoundError = require("../utils/Errors/NotFoundError");
const SavedItem = require("../models/savedItem");

const { BAD_REQUEST_MESSAGE, NOT_FOUND_MESSAGE } = require("../utils/errors");

const createItem = (req, res, next) => {
  const ownerId = req.user._id;
  const { keyword, title, text, date, source, link, image } = req.body;
  SavedItem.create({
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

const getItems = (req, res, next) => {
  const owner = req.user._id;
  SavedItem.find({ owner })
    .then((items) => res.send(items))
    .catch((err) => next(err));
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  SavedItem.findByIdAndDelete(itemId)
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

module.exports = { getItems, createItem, deleteItem };
