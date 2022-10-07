const { Schema, model, Types } = require('mongoose');
const dateFormat = require('date-and-time');

const UserSchema = new Schema(
    {
    username: {
        type: String,
        required: 'You need to provide a username',
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: 'You need to provide an email',
        unique: true,
        match: [/.+@.+\..+/]
    },
    thoughts: [
        {
            types: Schema.Types.ObjectId,
            ref: 'Thought' 
        }
  
    ],
    friends: [
        {
            types: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]    
},
{
    toJSON: {
        virtuals: true
    },
    id: false
}
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;
