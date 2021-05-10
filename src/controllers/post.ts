import {Post} from "../models/post";
import fs from "fs";
import path from "path";
import mongodb from 'mongodb';

const ObjectID = mongodb.ObjectID;

export const getAllPost = (req: any, res: any) => {
    Post.find({}, (err: any, posts: any) => {
        if (err) {
            res.send({'error': 'An error has occurred'});
        } else {
            res.send(posts);
        }
    })
}

export const getPostById = (req: any, res: any) => {
    Post.findOne({'_id': new ObjectID(req.params.id)}, (err: any, post: any) => {
        if (err) {
            res.send({'error': 'An error has occurred'});
        } else {
            res.send(post);
        }
    })
}
// get post by id -> get user by id -> comments
/**
 * post
 * user
 * comments
 */
export const getAllPostData = async (req: any, res: any) => {
    const data = await Post.aggregate([
        {
            $match: {_id: new ObjectID(req.params.id)}
        },
        {
            $lookup: {
                from: "comments",
                localField: "_id",
                foreignField: "post_id",
                as: "comments"
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "user_id",
                foreignField: "_id",
                as: "user"
            }
        },
        {"$unwind": "$user"}
    ]);

    // TODO:
    res.send(data[0]);
}

export const addPost = (req: any, res: any) => {
    const post = new Post({
        comments_id: req.body.comments_id,
        description: req.body.description,
        images: req.files.map((file: { filename: string; }) => fs.readFileSync(path.join(__dirname + '../../../uploads/' + file.filename), {encoding: 'base64'})),
        title: req.body.title,
        likes: 0,
        user_id: new ObjectID(req.body.user_id)
    });

    post.save((err: any, result: any) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
}

export const updatePost = (req: any, res: any) => {
    Post.findOneAndUpdate({'_id': new ObjectID(req.body.id)}, {$inc: {likes: req.body.likes}}, {
        new: true
    }, (err, doc) => {
        if (err) {
            res.send({'error': 'An error has occurred'});
        } else {
            res.send(doc);
        }
    })
}

export const deletePost = (req: any, res: any) => {
    Post.deleteOne({'_id': new ObjectID(req.params.id)}, (err: any) => {
        if (err) {
            res.send({'error': 'An error has occurred'});
        }
    })
}