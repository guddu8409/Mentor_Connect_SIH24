const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../config/cloudConfig.js");
const upload = multer({ storage });
const logger = require("../utils/logger")('eventRoutes');
const eventController = require("../controllers/eventController");
const { isLoggedIn } = require("../middlewares/authMiddleware");
const { validateEvent } = require("../middlewares/event");
router.use(express.urlencoded({ extended: true }));
// Route to get all events and create a new event
router
  .route("/")
  .get((req, res, next) => {
    logger.info("======= [ROUTE: Get All Events] =======");
    next();
  }, eventController.index)
  .post(isLoggedIn, validateEvent, (req, res, next) => {
    logger.info("======= [ROUTE: Create New Event] =======");
    logger.info(`User ID: ${req.user ? req.user._id : 'Not logged in'} is trying to create a new event`);
    next();
  }, eventController.create);

// Route to render the form for creating a new event
router.route("/new").get(isLoggedIn, (req, res, next) => {
  logger.info("======= [ROUTE: Render New Event Form] =======");
  next();
}, eventController.new);

// Route to get, update, and delete a specific event
router
  .route("/:id")
  .get((req, res, next) => {
    logger.info("======= [ROUTE: Get Event Details] =======");
    next();
  }, eventController.show)
  .put(isLoggedIn, validateEvent,(req, res, next) => {
    logger.info("======= [ROUTE: Update Event] =======");
    next();
  }, eventController.update)
  .delete(isLoggedIn, (req, res, next) => {
    logger.info("======= [ROUTE: Delete Event] =======");
    next();
  }, eventController.delete);

// Route to render the edit form for a specific event
router.route("/:id/edit").get(isLoggedIn, (req, res, next) => {
  logger.info("======= [ROUTE: Render Edit Event Form] =======");
  next();
}, eventController.edit);

// Routes to like and leave an event
router.route("/:id/like").get(isLoggedIn, eventController.like);
router.route("/:id/join").get(isLoggedIn,(req,res,next)=>{console.log("join routes");next();
}, eventController.join);
router.route("/:id/leave").get(isLoggedIn, (req,res,next)=>{console.log("leave routes");next();
},eventController.leave);

module.exports = router;
