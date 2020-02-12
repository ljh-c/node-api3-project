const express = require('express');

const router = express.Router();

const User = require('./userDb');

router.post('/', validateUser, async (req, res) => {
  try {
    const newUser = await User.insert(req.body);

    res.status(201).json(newUser);
  }
  catch (err) {
    console.dir(err);
    res.status(500).json({ error: "There was an error while saving user to the database." })
  }
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
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

router.get('/:id/posts', (req, res) => {
  // do your magic!
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
    console.log(req.body);
    res.status(400).json({ message: "missing required name field" });
  } else {
    console.log('USER INFO VALIDATED');

    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
