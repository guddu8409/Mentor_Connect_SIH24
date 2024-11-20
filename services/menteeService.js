const Mentee = require("../models/mentee/mentee");

const getAllMentees = async () => {
  return await Mentee.find({});
};

const getMenteeByUserId = async (userId) => {
  return await Mentee.findOne({ user: userId }).populate("user").exec();
};

const addMentee = async (menteeData) => {
  const mentee = new Mentee(menteeData);
  return await mentee.save();
};

const updateMentee = async (menteeId, updateData) => {
  return await Mentee.findByIdAndUpdate(menteeId, updateData, { new: true });
};

const deleteMentee = async (menteeId) => {
  return await Mentee.findByIdAndDelete(menteeId);
};

module.exports = {
  getAllMentees,
  getMenteeByUserId,
  addMentee,
  updateMentee,
  deleteMentee,
};
