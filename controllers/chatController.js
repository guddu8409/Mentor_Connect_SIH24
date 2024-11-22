const Chat = require("../models/chat");
const User = require("../models/user");

module.exports.renderChatPage = async (req, res) => {
  const { userId1, userId2 } = req.params;
  const loggedInUser = req.user; // Assuming req.user contains the logged-in user's data

  try {
    // Fetch the chat room based on participants
    let chat = await Chat.findOne({
      participants: { $all: [userId1, userId2] },
    })
      .populate("participants", "username role")
      .populate("messages.sender", "username");

    if (!chat) {
      // Create a new chat room if one doesn't exist
      chat = new Chat({
        participants: [userId1, userId2],
      });
      await chat.save();
    }

    // Ensure participants are correctly populated
    const secondPersonId = 
      userId1 === loggedInUser._id.toString() ? userId2 : userId1;

    const secondPerson = chat.participants.find(
      (participant) => participant._id.toString() === secondPersonId
    );

    if (!secondPerson) {
      return res
        .status(404)
        .send("The other user in the chat could not be found.");
    }

    // Log chat and participants for debugging
    console.log("Chat data:", chat);
    console.log("Second person:", secondPerson);

    // Prepare chat messages with serialized timestamps
    const chatMessages = chat.messages.map((msg) => ({
      ...msg.toObject(),
      sender: {
        _id: msg.sender._id.toString(),
        username: msg.sender.username,
      },
      timestamp: msg.timestamp.toISOString(), // Convert timestamp to ISO format
    }));

    // Render the appropriate view based on the user's role
    res.render(
      loggedInUser.role === "mentor" ? "mentor/chat/chat" : "mentee/chat/chat",
      {
        chat: {
          ...chat.toObject(),
          messages: chatMessages,
        },
        loggedInUser: {
          id: loggedInUser._id.toString(),
          name: loggedInUser.username,
          role: loggedInUser.role,
        },
        secondPerson: {
          id: secondPerson._id.toString(),
          name: secondPerson.username,
          role: secondPerson.role,
        },
        cssFile: "chat3.css",
      }
    );
  } catch (error) {
    console.error("Error rendering chat page:", error);
    res.status(500).send("An error occurred.");
  }
};

/*
module.exports.getOrCreateChat = async (req, res) => {
  const { userId1, userId2 } = req.params; // Now, the IDs are generic user IDs

  console.log(
    "................................getOrCreateChat................................"
  );
  console.log("userId1: " + userId1);
  console.log("userId2: " + userId2);

  try {
    // Check if a chat already exists between the two users
    let chat = await Chat.findOne({
      participants: { $all: [userId1, userId2] },
    });

    if (!chat) {
      // Create a new chat room
      chat = new Chat({
        participants: [userId1, userId2],
      });
      await chat.save();
    }

    res.status(200).json({ success: true, chat });
  } catch (error) {
    console.error("Error creating or fetching chat:", error);
    res.status(500).json({ success: false, message: "An error occurred." });
  }
};
module.exports.sendMessage = async (req, res) => {
  const { chatId } = req.params;
  const { senderId, text } = req.body;

  try {
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res
        .status(404)
        .json({ success: false, message: "Chat not found." });
    }

    // Add the new message
    chat.messages.push({ sender: senderId, text });
    chat.updatedAt = Date.now();
    await chat.save();

    res
      .status(200)
      .json({ success: true, message: "Message sent successfully." });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ success: false, message: "An error occurred." });
  }
};

module.exports.getMessages = async (req, res) => {
  const { chatId } = req.params;

  try {
    const chat = await Chat.findById(chatId).populate(
      "messages.sender",
      "username"
    );
    if (!chat) {
      return res
        .status(404)
        .json({ success: false, message: "Chat not found." });
    }

    res.status(200).json({ success: true, messages: chat.messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ success: false, message: "An error occurred." });
  }
};

*/

/*


chat is: {
  "_id":"6740b5c70697eb459189926e",
  "participants":["673fe9677f19a805d5348170","673fe9677f19a805d534817a"],
  "messages":[
    {"sender":{"_id":"673fe9677f19a805d534816e","username":"mentor"},"text":"hi","timestamp":"2024-11-22T16:48:10.193Z","_id":"6740b5ca0697eb4591899271"},
    {"sender":{"_id":"673fe9677f19a805d5348178","username":"mentee"},"text":"hello","timestamp":"2024-11-22T16:48:47.391Z","_id":"6740b5ef0697eb459189928d"},
    {"sender":{"_id":"673fe9677f19a805d534816e","username":"mentor"},"text":"ok","timestamp":"2024-11-22T16:48:51.176Z","_id":"6740b5f30697eb4591899292"},
    {"sender":{"_id":"673fe9677f19a805d5348178","username":"mentee"},"text":"bye","timestamp":"2024-11-22T16:48:56.506Z","_id":"6740b5f80697eb4591899298"}
  ],
  "createdAt":"2024-11-22T16:48:07.462Z","updatedAt":"2024-11-22T16:48:07.462Z","__v":4}

*/
