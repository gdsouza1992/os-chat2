const models = require('../models')
const User = models.user;

// IMPORT ROUTES
// =============================================================================
const router = require('express').Router();
// on routes that end in /users
// ----------------------------------------------------
router.route('/')

// create a user 
.post(function(req, res) {

    var username = req.body.username;

    var user = User.build({ username: username});

    user._modelOptions.instanceMethods.add()
    .then((data) => {
        res.json({ message: 'User created!' });
    })
    .catch((error) => {
      res.send(error)
    })
    // function(success){
    //     res.json({ message: 'User created!' });
    // },
    // function(err) {
    //     res.send(err);
    // });
})

// get all the users 
.get(function(req, res) {
    var user = User.build();
    // user.retrieveAll()
    
    user._modelOptions.instanceMethods.retrieveAll()
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
      res.send("User not found")
    })

    

    // function(users) {
    //     if (users) {
    //       res.json(users);
    //     } else {
    //       res.send(401, "User not found");
    //     }
    //   }, function(error) {
    //     res.send("User not found");
    //   });
});

// on routes that end in /users/:user_id or /user/:user_id
// ----------------------------------------------------
router.route('/:user_id')

// update a user 
.put(function(req, res) {
    var user = User.build();

    user.username = req.body.username;
    console.log(req.body);  
    user._modelOptions.instanceMethods.updateById(req.params.user_id)
    .then((data) => {
        res.json({message: 'User updated!'});
    })
    .catch((error) => {
        res.send("User not found")
    })



    // , function(success) {
    //     if (success) {
    //         res.json({ message: 'User updated!' });
    //     } else {
    //       res.send(401, "User not found");
    //     }
    //   }, function(error) {
    //     res.send("User not found");
    //   });
})

// get a user by id
.get(function(req, res) {
    var user = User.build();
    user._modelOptions.instanceMethods.retrieveById(req.params.user_id)
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
      res.send("User not found")
    })
    // , function(user) {
    //     if (user) {
    //       res.json(user);
    //     } else {
    //       res.send(401, "User not found");
    //     }
    //   }, function(error) {
    //     res.send("User not found");
    //   });
})

// delete a user by id 
.delete(function(req, res) {
    var user = User.build();
    user._modelOptions.instanceMethods.removeById(req.params.user_id)
    .then((data) => {
        res.json({ message: 'User removed!' });
    })
    .catch((error) => {
      res.send("User not found")
    })



    // , function(users) {
    //     if (users) {
    //       res.json({ message: 'User removed!' });
    //     } else {
    //       res.send(401, "User not found");
    //     }
    //   }, function(error) {
    //     res.send("User not found");
    //   });
});

// Middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('User route.');
    next();
});


module.exports = router;