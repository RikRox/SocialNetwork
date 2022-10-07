const { User, Thought} = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: "friends",
            select: "-__v",
        })
        .sort({_id: -1})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400)
        })
    },
    getUserById({ parasm}, res) {
        User.findOne({ _id: parasm.id})
        .populate({
            path:"thoughts",
            select: "-__v",
        })
        .populate({
            path: "friends",
            select: "-__v"
        })
        .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No User found with this id!' });
              return;
         }              
         res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
      },
    
      createUser({ body }, res){
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
      },
//update user by id
    }
