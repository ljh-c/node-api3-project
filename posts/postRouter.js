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

// GET POST BY ID
router.get('/:id', validatePostId, (req, res) => {
  try {
    res.status(200).json(req.post);
  }
  catch (err) {
    res.status(500).json({ error: err.message, message: "Post could not be retrieved." });
  }
});

// DELETE POST
router.delete('/:id', validatePostId, async (req, res) => {
  try {
    if (await Post.remove(req.post.id) !== 1) {
      res.status(500).json({ error: "Unexpected value returned from remove function." });
    } else {
      res.status(200).json(await Post.get());
    }
  }
  catch (err) {
    res.status(500).json({ error: err.message, message: "Post could not be removed." });

  }
});

// UPDATE POST
router.put('/:id', validatePostId, validatePost, async (req, res) => {
  try {
    if (await Post.update(req.post.id, req.body) !== 1) {
      res.status(500).json({ error: "Unexpected value returned from update function." });
    } else {
      Post.getById(req.post.id).then(post => {
        res.status(200).json(post);
      }).catch(err => {
        res.status(500).json({ error: err.message, message: "Unexpected error with getById." });
      });
    }
  }
  catch (err) {
    res.status(500).json({ error: err.message, message: "Post could not be modified." });
  }
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

function validatePost(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing post data" });
  } else if (!req.body.text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    console.log('POST INFO VALIDATED');

    next();
  }
}

module.exports = router;
