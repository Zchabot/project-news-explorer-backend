const SavedItem = require("../models/clothingItem");
const {
  BAD_REQUEST_MESSAGE,
  NOT_FOUND_MESSAGE,
  FORBIDDEN_MESSAGE,
} = require("../utils/errors");
const BadRequestError = require("../utils/Errors/BadRequestError");
const NotFoundError = require("../utils/Errors/NotFoundError");
const ForbiddenError = require("../utils/Errors/ForbiddenError");

const checkOwner = (req, res, next) => {
  const { itemId } = req.params;
  const ownerId = req.user._id;
  SavedItem.findById(itemId)
    .orFail()
    .then((item) => {
      const itemOwner = item.owner._id.toString();
      if (itemOwner === ownerId) {
        next();
      } else {
        next(new ForbiddenError(FORBIDDEN_MESSAGE));
      }
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError(NOT_FOUND_MESSAGE));
      }
      if (err.name === "CastError") {
        next(new BadRequestError(BAD_REQUEST_MESSAGE));
      }
      next(err);
    });
};

module.exports = { checkOwner };
