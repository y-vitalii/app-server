import mongoose, {Schema, Types} from "mongoose";

const commentScheme = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    likes: Number,
    date_created: {
        type: Date,
        default: Date.now
    },
    date_updated: Date,
    parent_id: mongoose.Schema.Types.ObjectId,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Post"
    }
});

const Comment = mongoose.model('Comment', commentScheme);

export default Comment;