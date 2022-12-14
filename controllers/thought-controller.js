const { Thought , User } = require('../models');

const thoughtController = {
    addThought({ params, body }, res){
        console.log(body);
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: {thoughts: _id } },
                    {new: true }
                );
            })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: "No User found with this ID!"});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    addReaction({ params, body }, res){
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: {reactions: body}},
            { new: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No Userfound with this ID! '});
                return;
            }
            res.json(dbUserData);
        }) 
        .catch(err => res.json(err));
    },
    removeThought({params}, res){
        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(deletedThought => {
            if(!deletedThought){
                return res.status(404).json({message: 'No thought with this ID!'});
            }
            return User.findOneAndUpdate(
                {_id: params.userId },
                {$pull: { thoughts: params.thoughtId}},
                { new: true }
            );
        })
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({ message: 'No user found with this ID!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    removeReaction({ params} , res){
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId}}},
            { new: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }

};


module.exports = thoughtController;
