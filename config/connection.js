const { connect, connection } = require("mongoose");

// After you create your Heroku application, visit https://dashboard.heroku.com/apps/ select the application name and add your Atlas connection string as a Config Var

const connectionString =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ssm_DB";

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
