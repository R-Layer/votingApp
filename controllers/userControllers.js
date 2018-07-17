const ObjectID = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/userModel');



exports.users_get_all = (req, res) => {
    User.find({}).exec()
            .then(users => res.status(200).json({
                message:"Users fetched correctly", 
                users})
            )
            .catch(err => res.status(500).json({
                message:"Error: users fetch failed", 
                err})
            );
};

exports.users_get_one = (req, res) => {
    
    let idTest='';
    try { 
        idTest = new ObjectID(req.params.id)
    } catch (err) {
        idTest = 'failed'
    }
    // Credits to andyMacleod [STACK OVERFLOW]
    let rdParam = idTest === req.params.id ? {_id: idTest} : {email: req.params.id}
    
    User.findOne(rdParam).exec()
            .then(user => {
                if(user){
                    res.status(200).json({
                        message:"User fetched correctly",
                        user
                    });
                } else {
                    res.status(404).json({
                        message: "User not found",
                        user
                    });
                }
            })
            .catch( err => res.status(500).json({
                message: "Error: user fetch failed",
                err
            })
        );
};

exports.users_create_one = (req, res) => {
    User.findOne({email: req.body.email}).exec()
            .then(user => {
                if(user) {
                    res.status(409).json({message:"Email already in use"});
                } else {
                    bcrypt.hash(req.body.password, 10)
                        .then(hashed => {
                            const newUser = new User ({
                                username: req.body.username,
                                email: req.body.email,
                                passwordHash: hashed
                                });
                            newUser.save()
                                .then(userCreated => res.status(201).json({
                                    message: "User successfully created", 
                                    userCreated})
                                )
                                .catch( err => res.status(500).json({
                                    message: "Error: user registration failed", 
                                    err}));
                        })
                        .catch(err => res.status(500).json({
                            message: "Error: user registration failed",
                            err
                        })
                    );
                };
            })
            .catch( err => res.status(500).json({
                        message:"Error: user registration failed", 
                        err})
                    );
};

exports.users_delete_one = (req, res) => {
// Credits to andyMacleod [STACK OVERFLOW]
    let idTest='';
    try { 
        idTest = new ObjectID(req.params.id)
    } catch (err) {
        idTest = 'failed'
    }
    let delParam = idTest === req.params.id ? {_id: idTest} : {email: req.params.id}

    User.findOneAndDelete(delParam).exec()
            .then( removedItem =>  {
                if(removedItem){
                   res.status(200).json({
                        message:`User <${removedItem.username}> removed`,
                        removedItem
                    });
                } else {
                    res.status(404).json({
                        message: "User not found",
                        err: removedItem
                    });
                };
            })
            .catch( err =>  {
                res.status(500).json({
                    message: "Error: user removal failed",
                    err
                   });
                }
            );
};

exports.users_update_one= (req, res) => {
    
    let idTest='';
    try { 
        idTest = new ObjectID(req.params.id)
    } catch (err) {
        idTest = 'failed'
    }
    // Credits to andyMacleod [STACK OVERFLOW]
    let updParam = idTest === req.params.id ? {_id: idTest} : {email: req.params.id}
    
    User.findOneAndUpdate(updParam, {$set:req.body}).exec()
        .then(userUpdated => {
            if(userUpdated) {
                res.status(200).json({
                    message:"User updated successfully",
                    userUpdated
                });
            } else {
                res.status(404).json({
                    message: "User not found",
                    err: userUpdated
                });
            };
        })
        .catch(err => {
            err.status(500).json({
                message:"Error: update failed",
                err
            });
        });
};

exports.users_authentication = (req, res) => {
    User.findOne({email: req.body.email}).exec()
        .then(user => {
            if(user) {
                    bcrypt.compare(req.body.password, user.passwordHash)
                .then(result => {
                    if (result) {
                        const token = jwt.sign( {username: user.username, id: user._id},
                                                 process.env.JWT_SECRET,
                                                { expiresIn: '1h'});
                        res.status(200).json({
                            message: "Auth successful",
                            token
                        });
                    } else {
                        res.status(401).json({
                            message: "Auth failed",     // Password doesn't match
                            user:null                        // Sent back user ( manually set to null) instead of result  to reduce the ability to check 
                                                        // client-side which one among password or email has been failed
                        });
                    };
                })
                .catch(err=> res.status(500).json({
                    message:"Error: authentication process failed",  // Fail during bcrypt.compare
                    err
                    })
                );
            } else {
                res.status(401).json({
                    message: "Auth failed",         // Email not found
                    user                            // User null, sent back for consistency
                });
            };
        })
        .catch(err => res.status(500).json({
            message: "Error: authentication process failed",    // Fail retrieving the email
            err
        }) 
    );
};