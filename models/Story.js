const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const StorySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'public'
    },
    allowComments: {
        type: Boolean,
        default: true
    },
    comments: [{
        commentBody: {
            type: String,
            required: true
        },
        commentDate: {
            type: Date,
            default: Date.now
        },
        commentUser: {                // Refers to the already registered user from 'users' collection
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    }],
    // story should belong to particular registered user only, we can access all fields of user like fname, lname etc using this user. e.g. story.user.firstName
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Create collection and add schema
mongoose.model('stories', StorySchema, 'stories');  // If last parameter is not specified, it may create collection as story, So to avoid it. Pass the exact name of collection