const express = require('express');

const router = express.Router();

const User = require('./userDb');
const Post = require('../posts/postDb');

router.post('/', validateUser, async (req, res) => {
  try {
    const newUser = await User.insert(req.body);
    res.status(201).json(newUser);
  }
  catch (err) {
    console.dir(err);
    res.status(500).json({ error: "There was an error while saving user to the database." });
  }
});

router.post('/:id/posts', validatePost, (req, res) => {
  Post.insert(req.body).then(newPost => {
    res.status(201).json(newPost);
  }).catch(err => {
    console.dir(err);
    res.status(500).json({ error: "There was an error while saving post to the database." });
  });
});

router.get('/', (req, res) => {
  User.get().then(users => {
    res.status(200).json(users);
  }).catch(err => {
    console.dir(err);
    res.status(500).json({ error: "The users could not be retrieved." });
  });
});

router.get('/:id', validateUserId, (req, res) => {
  try {
    res.status(200).json(req.user);
  }
  catch (err) {
    console.dir(err);
    res.status(500).json({ error: "The user could not be retrieved." });
  }
});

router.get('/:id/posts', validateUserId, async (req, res) => {
  try {
    const posts = await Post.get();

    const userPosts = posts.filter(post => `${post.user_id}` === req.params.id);
    // req.params.id is a string
    // user_id property of each post is a number

    if (userPosts.length === 0) {
      res.status(200).json({ message: "This user has no posts." })
    } else {
      res.status(200).json(userPosts);
    }
  }
  catch (err) {
    console.dir(err);
    res.status(500).json({ error: "The user's posts could not be retrieved." });
  }
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  User.getById(req.params.id).then(user => {
    if (user === undefined) {
      res.status(400).json({ message: "invalid user id" });
    } else {
      console.log('USER ID VALIDATED');

      req.user = user;
      
      next();
    }
  }).catch(err => {
    console.dir(err);
    res.status(500).json({ error: "Unexpected error with validateUserId." });
  });
}

function validateUser(req, res, next) {
  // check if req.body object is empty
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing user data" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    console.log('USER INFO VALIDATED');

    next();
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
