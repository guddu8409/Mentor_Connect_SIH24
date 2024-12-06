const mongoose = require("mongoose");
const { Schema } = mongoose;
const SuccessReview = require("./successReview"); // Ensure the path is correct

const successSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    url: String,
    filename: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "SuccessReview",
    },
  ],
});

successSchema.post("findOneAndDelete", async function(successStory) {
  if (successStory) {
    await SuccessReview.deleteMany({ _id: { $in: successStory.reviews } });
  }
});

const Success = mongoose.model("Success", successSchema);
module.exports = Success;
