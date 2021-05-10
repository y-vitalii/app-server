import * as mongoose from "mongoose";

const likeScheme = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    post_id: {
        type:  mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Post"
    },
    value: Number
});

export const Like = mongoose.model('Like', likeScheme);