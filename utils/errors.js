const BAD_REQUEST_MESSAGE =
  "invalid data passed to the methods for creating an item/user or updating an item/user, or invalid ID passed to the params.";

const NOT_FOUND_MESSAGE = "Requested resource not found";

const DEFAULT_MESSAGE = "An error has occurred on the server";

const UNAUTHORIZED_MESSAGE = "Authorization Required";

const FORBIDDEN_MESSAGE = "Authorization required to perform this action";

const CONFLICT_MESSAGE = "An account already exists for this email address";

const MISSING_FIELDS_MESSAGE = "The email and password fields are required";

module.exports = {
  BAD_REQUEST_MESSAGE,
  NOT_FOUND_MESSAGE,
  DEFAULT_MESSAGE,
  UNAUTHORIZED_MESSAGE,
  FORBIDDEN_MESSAGE,
  CONFLICT_MESSAGE,
  MISSING_FIELDS_MESSAGE,
};
