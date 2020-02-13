const express = require('express');

const router = express.Router();

const Post = require('./postDb.js');

// GET POSTS
router.get('/', async (req, res) => {
  try {
    res.status(200).json(await Post.get());
  }
  catch (err) {
    res.status(500).json({ error: err.message, message: "Posts could not be retrieved." });
  }
});

router.get('/:id', validatePostId, (req, res) => {
  try {
    res.status(200).json(req.post);
  }
  catch (err) {
    res.status(500).json({ error: err.message, message: "Post could not be retrieved." });
  }
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

async function validatePostId(req, res, next) {
  try {
    const post = await Post.getById(req.params.id);

    if (post === undefined) {
      res.status(400).json({ message: "Invalid post id" });
    } else {
      req.post = post;

      next();
    }
  }
  catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = router;
