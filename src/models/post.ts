import mongoose from "mongoose";

interface IPost {
    _id?: string
    title: string,
    image: string,
    description: string,
    comments_id: string[],
    user_id: string
}

const postScheme = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    likes: Number,
    images: [String],
    description: String,
    date_created: {
        type: Date,
        default: Date.now
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
});

export const Post = mongoose.model('Post', postScheme);