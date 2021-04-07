const express = require("express");
const bodyParser = require("body-parser");
const promise = require("bluebird");
const jwt = require("express-jwt");
const jsonwebtoken = require("jsonwebtoken");
var cookieParser = require("cookie-parser");
var dateFormat = require("dateformat");
const cors = require("cors");
const path = require("path");
const crypto = require("crypto");
require("dotenv").config();
const log = require("simple-node-logger").createSimpleLogger();
const secret = process.env.TOKEN_SECRET;
const initOptions = {
  promiseLib: promise,
};

var pgp = require("pg-promise")(initOptions);
const cn = {
     host: '46.148.227.42', // 'localhost' is the default;
     port: 6432, // 5432 is the default;
     database: 'Project_database',
     user: 'root',
     password: '12345'
 };
var db = pgp(cn);
const BACKEND_PORT = process.env.BACKEND_PORT;
const app = express();
app.enable("trust proxy");
app.use(cookieParser());
app.use(express.static("client/src"));

app.use(bodyParser.urlencoded({ extended: false }));

function showRequestInfo(req, res, next) {
  log.info("request start:");
  log.info("Body of request", req.body);
  log.info("Query of request", req.query);
  log.info("request end:");
  next();
}

app.get("/olimpiads", showRequestInfo, (req, res) => {
  db.any(
    "SELECT id, name, description, level, type, directions, classes, date_competition, date_registration FROM olympiads WHERE visible = true"
  )
    .then((data) => {
      var answerAboutOlympiads = JSON.parse(JSON.stringify(data));
      log.info(answerAboutOlympiads);
      res.json(answerAboutOlympiads);
      return;
    })
    .catch((error) => {
      log.error(
        "Problem while getting information about all olympiads",
        error
      );
      res.status(500).send("Unexpected error");
      return;
    });
});
app.get("/getolympiadinfo", showRequestInfo, (req, res) => {
  db.any(
    "SELECT id, name, description, level, type, directions, classes, date_competition, date_registration, organization FROM olympiads WHERE id = $1", req.query.id
  )
    .then((data) => {
      var answerAboutOlympiad = JSON.parse(JSON.stringify(data));
      log.info(answerAboutOlympiad);
      res.json(answerAboutOlympiad);
      return;
    })
    .catch((error) => {
      log.error(
        "Problem while getting information about all olympiads",
        error
      );
      res.status(500).send("Unexpected error");
      return;
    });
});

app.get(
  "/getfilterlanguages",
  showRequestInfo,
  (req, res) => {
    db.any(
      "SELECT language_name FROM detail_user_commits GROUP BY language_name ORDER BY language_name"
    )
      .then((data) => {
        var answer = JSON.parse(JSON.stringify(data));
        var result = [];
        for (var i = 0; i < answer.length; i++) {
          result.push(answer[i]["language_name"]);
        }
        res.json(result);
      })
      .catch((error) => {
        log.error(
          "Problem while getting information about filter form languages from detail_user_commits:",
          error
        );
        res.status(500).send("Unexpected error");
        return;
      });
  }
);


app.listen(BACKEND_PORT, () =>
  log.info(`Server listening at http://localhost:${BACKEND_PORT}`)
);
