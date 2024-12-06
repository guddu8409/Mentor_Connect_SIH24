const Success = require("../models/success");
const ExpressError = require("../utils/expressError");
const wrapAsync = require("../utils/wrapAsync");
const logger = require("../utils/logger")('successController'); // Specify label

module.exports.index = wrapAsync(async (req, res) => {
  try {
    logger.info("Fetching all success stories");

    const successes = await Success.find({});
    res.render("success/index", { successes, cssFile: "success/successIndex.css" });

    logger.info("Successfully fetched and rendered success stories");
  } catch (error) {
    logger.error("Error fetching success stories", error);
    req.flash("error", "Error retrieving success stories.");
    res.redirect("/");
  }
});

module.exports.show = wrapAsync(async (req, res) => {
  const { id } = req.params;
  try {
    logger.info(`Fetching success story with ID: ${id}`);

    const successStory = await Success.findById(id)
      .populate({
        path: "reviews",
        populate: { path: "author" },
      })
      .populate("owner");

    if (!successStory) {
      logger.error(`Success story not found with ID: ${id}`);
      req.flash("error", "Success story does not exist!");
      return res.redirect("/successes");
    }

    res.render("success/show", {
      successStory,
      cssFile: "success/successShow.css",
    });

    logger.info(`Successfully fetched and rendered success story with ID: ${id}`);
  } catch (error) {
    logger.error(`Error fetching success story with ID: ${id}`, error);
    req.flash("error", "Error retrieving success story.");
    res.redirect("/successes");
  }
});

module.exports.renderNewForm = wrapAsync(async (req, res) => {
  try {
    res.render("success/new", { cssFile: "success/successNew.css" });
    logger.info("Rendered new success story form");
  } catch (error) {
    logger.error("Error rendering new success story form", error);
    req.flash("error", "Error displaying new success story form.");
    res.redirect("/successes");
  }
});

module.exports.create = wrapAsync(async (req, res) => {
  try {
    logger.info("Creating new success story");

    const newSuccess = new Success(req.body.success);
    newSuccess.owner = req.user._id;
    newSuccess.image = { url: req.file.path, filename: req.file.filename };
    await newSuccess.save();

    // Update the user's successStories array
    const user = await User.findById(req.user._id);
    user.successStories.push(newSuccess._id);
    await user.save();

    req.flash("success", "New success story created!");
    res.redirect("/successes");

    logger.info(`Successfully created new success story with ID: ${newSuccess._id}`);
  } catch (error) {
    logger.error("Error creating new success story", error);
    req.flash("error", "Error creating success story.");
    res.redirect("/successes");
  }
});


module.exports.renderEditForm = wrapAsync(async (req, res) => {
  const { id } = req.params;
  try {
    logger.info(`Fetching success story for editing with ID: ${id}`);

    const successStory = await Success.findById(id);
    if (!successStory) {
      logger.error(`Success story not found with ID: ${id}`);
      req.flash("error", "Success story not found!");
      return res.redirect("/successes");
    }

    res.render("success/edit", {
      successStory,
      cssFile: "success/successEdit.css",
    });

    logger.info(`Rendered edit form for success story with ID: ${id}`);
  } catch (error) {
    logger.error(`Error fetching success story for editing with ID: ${id}`, error);
    req.flash("error", "Error retrieving success story for editing.");
    res.redirect("/successes");
  }
});

module.exports.update = wrapAsync(async (req, res) => {
  const { id } = req.params;
  try {
    logger.info(`Updating success story with ID: ${id}`);

    const updatedStory = await Success.findByIdAndUpdate(id, req.body.success, { new: true });

    req.flash("success", "Successfully updated the success story!");
    res.redirect(`/successes/${updatedStory._id}`);

    logger.info(`Successfully updated success story with ID: ${id}`);
  } catch (error) {
    logger.error(`Error updating success story with ID: ${id}`, error);
    req.flash("error", "Error updating success story.");
    res.redirect(`/successes/${id}`);
  }
});

module.exports.delete = wrapAsync(async (req, res) => {
  const { id } = req.params;
  try {
    logger.info(`Deleting success story with ID: ${id}`);

    await Success.findByIdAndDelete(id);

    req.flash("success", "Success story deleted!");
    res.redirect("/successes");

    logger.info(`Successfully deleted success story with ID: ${id}`);
  } catch (error) {
    logger.error(`Error deleting success story with ID: ${id}`, error);
    req.flash("error", "Error deleting success story.");
    res.redirect("/successes");
  }
});

module.exports.toggleLike = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    logger.info(`Toggling like for success story with ID: ${id}`);

    const successStory = await Success.findById(id);
    if (!successStory) {
      logger.error(`Success story not found with ID: ${id}`);
      req.flash("error", "Success story does not exist!");
      return res.redirect("/successes");
    }

    const hasLiked = successStory.likes.some(like => like.equals(userId));
    if (hasLiked) {
      await Success.findByIdAndUpdate(id, { $pull: { likes: userId } });
    } else {
      await Success.findByIdAndUpdate(id, { $push: { likes: userId } });
    }

    logger.info(`Like toggled for success story with ID: ${id} by user ID: ${userId}`);
    res.redirect("/successes");
  } catch (error) {
    logger.error(`Error toggling like for success story with ID: ${id}`, error);
    req.flash("error", "Error toggling like.");
    res.redirect("/successes");
  }
});

module.exports.toggleReport = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    logger.info(`Toggling report for success story with ID: ${id}`);

    const successStory = await Success.findById(id);
    if (!successStory) {
      logger.error(`Success story not found with ID: ${id}`);
      req.flash("error", "Success story does not exist!");
      return res.redirect("/successes");
    }

    const hasReported = successStory.reports.some(report => report.equals(userId));
    if (hasReported) {
      await Success.findByIdAndUpdate(id, { $pull: { reports: userId } });
    } else {
      await Success.findByIdAndUpdate(id, { $push: { reports: userId } });
    }

    logger.info(`Report toggled for success story with ID: ${id} by user ID: ${userId}`);
    req.flash("success", "Success story reported!");
    res.redirect("/successes");
  } catch (error) {
    logger.error(`Error toggling report for success story with ID: ${id}`, error);
    req.flash("error", "Error toggling report.");
    res.redirect("/successes");
  }
});
