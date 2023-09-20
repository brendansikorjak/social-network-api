const { Thought } = require('../models');

module.exports = {
  // GET all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.status(200).json(thoughts);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },
  // CREATE a new thought
  async createThought(req, res) {
    const { text, userId } = req.body;
    try {
      const newThought = new Thought({ text, userId });
      await newThought.save();
      res.status(201).json(newThought);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },
  // GET a thought by ID
  async getSingleThought(req, res) {
    const { thoughtId } = req.params;
    try {
      const thought = await Thought.findById(thoughtId);
      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      res.status(200).json(thought);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },
  // UPDATE a thought by ID
  async updateThought(req, res) {
    const { thoughtId } = req.params;
    const { text } = req.body;
    try {
      const thought = await Thought.findByIdAndUpdate(
        thoughtId,
        { text },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      res.status(200).json(thought);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },
  // DELETE a thought by ID
  async deleteThought(req, res) {
    const { thoughtId } = req.params;
    try {
      const thought = await Thought.findByIdAndRemove(thoughtId);
      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },
};
