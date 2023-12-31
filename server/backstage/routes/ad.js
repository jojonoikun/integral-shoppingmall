/*
 * @Author: JOJOcode
 * @Date: 2022-12-07 11:43:36
 * @LastEditTime: 2022-12-07 11:58:57
 * @FilePath: \MiMallBackstage-main\backstage\routes\ad.js
 */
var express = require("express");
var router = express.Router();
var cors = require("cors");
router.use(cors());

var Search = require("../js/search");
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "mimall",
});

/* GET users listing. */
router.get("/slides", function (req, res) {
  Search.getSearch(req.query, "slides", connection, res);
});

router.get("/smartwear", function (req, res) {
  Search.getSearch(req.query, "adsmartwear", connection, res);
});

router.get("/smarthome", function (req, res) {
  Search.getSearch(req.query, "adsmarthome", connection, res);
});

router.get("/recommend", function (req, res) {
  Search.getSearch(req.query, "recommend", connection, res);
});

router.get("/lifeappliance", function (req, res) {
  Search.getSearch(req.query, "adlifeappliance", connection, res);
});

router.get("/adonhome", function (req, res) {
  Search.getSearch(req.query, "adonhome", connection, res);
});

router.get("/adwide", function (req, res) {
  Search.getSearch(req.query, "adwide", connection, res);
});

router.get("/phones", function (req, res) {
  Search.getSearch(req.query, "adphones", connection, res);
});

router.get("/household", function (req, res) {
  Search.getSearch(req.query, "adhousehold", connection, res);
});

router.get("/kitchen", function (req, res) {
  Search.getSearch(req.query, "adkitchen", connection, res);
});

router.get("/sports", function (req, res) {
  Search.getSearch(req.query, "adsports", connection, res);
});

router.get("/daily", function (req, res) {
  Search.getSearch(req.query, "addaily", connection, res);
});

router.get("/top", function (req, res) {
  Search.getSearch(req.query, "adsontop", connection, res);
});

router.get("/left", function (req, res) {
  Search.getSearch(req.query, "adonleft", connection, res);
});
module.exports = router;
