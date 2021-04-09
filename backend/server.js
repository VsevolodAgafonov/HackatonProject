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

app.get("/olympiads", showRequestInfo, (req, res) => {
  log.info("Your query is ", req.query.search_value);
  if (req.query.search_value == undefined || req.query.search_value ==""){
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
  }
  else {
    db.any(
      "SELECT id, name, description, level, type, directions, classes, date_competition, date_registration FROM olympiads WHERE visible = true AND (name LIKE '%" + req.query.search_value + "%' OR directions LIKE '%" + req.query.search_value + "%' OR classes LIKE '%" + req.query.search_value + "%' OR type LIKE '%" + req.query.search_value + "%')"
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
  }
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
app.get("/addolympiad", showRequestInfo, (req, res) => {
  log.info(req.query.name, req.query.description);
  db.any(
    "SELECT id FROM olympiads ORDER BY id DESC LIMIT 1"
  )
    .then((data) => {
      var answerAboutLastId = JSON.parse(JSON.stringify(data));
      log.info(answerAboutLastId[0]["id"]);
      db.any(
      "INSERT INTO olympiads VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, true)", [parseInt(answerAboutLastId[0]["id"]) + 1, req.query.name, req.query.description, req.query.type, req.query.level, req.query.classes, req.query.directions, req.query.dateCompetition, req.query.dateRegistration, req.query.organization]
      )
      .then((data) => {
        
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
app.get("/deleteolympiad", showRequestInfo, (req, res) => {

  db.any(
    "UPDATE olympiads SET visible = false WHERE id = $1", req.query.id
  )
    .then((data) => {
      var answerAboutLastId = JSON.parse(JSON.stringify(data));
      log.info("Deleting olympiad by id Done");
      return;
    })
    .catch((error) => {
      log.error(
        "Problem while deleting olympiad",
        error
      );
      res.status(500).send("Unexpected error");
      return;
    });
});
app.get("/editolympiad", showRequestInfo, (req, res) => {
  log.info("Begin updating");
  log.info(req.query.name, req.query.id);
  db.any(
    "UPDATE olympiads SET name = $1, description = $2, type = $3, level = $4, classes = $5, directions = $6, date_competition = $7, date_registration = $8, organization = $9 WHERE id = $10", [req.query.name, req.query.description, req.query.type, req.query.level, req.query.classes, req.query.directions, req.query.dateCompetition, req.query.dateRegistration, req.query.organization, req.query.id]
  )
    .then((data) => {
      var answerAboutLastId = JSON.parse(JSON.stringify(data));
      log.info("Update olympiad by id Done");
      return;
    })
    .catch((error) => {
      log.error(
        "Problem while updating olympiad",
        error
      );
      res.status(500).send("Unexpected error");
      return;
    });
});



app.listen(BACKEND_PORT, () =>
  log.info(`Server listening at http://localhost:${BACKEND_PORT}`)
);
