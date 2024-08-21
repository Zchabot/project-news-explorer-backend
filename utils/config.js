const {
  JWT_SECRET = "testKEY95",
  DATABASE = "mongodb://127.0.0.1:27017/news-explorer-db",
} = process.env;

module.exports = { JWT_SECRET, DATABASE };
