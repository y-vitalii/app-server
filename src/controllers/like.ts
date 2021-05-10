import {Like} from "../models/like"
import mongodb from "mongodb";


const ObjectID = mongodb.ObjectID;

export const addLike = (req: any, res: any) => {
    const like = new Like({...req.body})
    like.save((err: any, doc: any) => {
        if (err) {
            res.send("error");
        } else {
            res.send(doc);
        }
    })
}

export const deleteLike = (req: any, res: any) => {
    Like.deleteOne({'_id': new ObjectID(req.body._id)}, (err: any) => {
        if (err) {
            res.send({'error': 'An error has occurred'});
        }
    })
}

export const getLikeByUserAndPost = (req: any, res: any) => {
    Like.findOne({
        'user_id': new ObjectID(req.params.userId),
        'post_id': new ObjectID(req.params.postId)
    }, (err: any, doc: any) => {
        if (err) {
            res.send({'error': 'An error has occurred'});
        } else {
            res.send(doc);
        }
    })
}