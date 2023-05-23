const { User, Thought } = require("../models");

const getThoughtMulti = async (req, res) => {
    try {
      const thoughtMulti = await Thought.find();
      res.status(200).json(thoughtMulti);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  };

const getSingleThought = async (req, res) => {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId }).select(
      "-__v"
    );
    if (!thought) {
      res.status(404).json({ message: "Could not find thought with ID." });
    } else {
      res.status(200).json(thought);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
createThought(req, res) {
    Thought.create(req.body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No User find with this ID!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

const createThought = async (req, res) => {
  try {
    const thought = await Thought.create(req.body);
    const user = await User.findOneAndUpdate(
      { _id: thought.userId  },
      { $push: { thoughts: thought } },
      { new: true }
    );
    res.status(200).json({ thought: thought });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, New: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No thought find with this ID!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

const updateThought = async (req, res) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body},
      { runValidators: true, new: true }
    );
    if(!thought){
        res.status(404).json({ message: "No thought with ID" })
    } else {
        res.status(200).json(thought);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};



const deleteThought = async (req, res) => {
  try {
    const thought = await Thought.findOneAndRemove({
      _id: req.params.thoughtId,
    });
    const user = await User.findOneAndUpdate(
      { username: thought.username },
      { $pull: { thoughts: thought._id } },
      { runValidators: true, new: true }
    );
    !thought
      ? res.status(404).json({ message: "No thought found with that ID." })
      : res.status(200).json({ user: user, deletedThought: thought });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

const createReaction = async (req, res) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    );
    if(!thought){
        res.status(404).json({ message: "No thought found with that ID" })
    } else {
        res.status(200).json(thought);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

const deleteReaction = async (req, res) => {
  try {
    const thought = await Thought.findOneAndRemove(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    );
    if(!thought){
        res.status(404).json({ message: "No thought found with that ID" })
    } else {
        res.status(200).json(thought);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};


module.exports = {
  createReaction,
  deleteReaction,
  getThoughtMulti,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
};
