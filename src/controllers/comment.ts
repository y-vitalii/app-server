import Comment from "../models/comment";

export const getAllComments = (req: any, res: any) => {
    Comment.find({}, (err: any, list: any) => {
        if (err) {
            res.status(500).send({message: err})
        } else {
            res.send(list)
        }
    })
}

export const addComment = (req: any, res: any) => {
    const comment = new Comment(req.body);

    comment.save((err: any) => {
        if (err) {
            res.status(500).send({message: err});
        } else {
            res.send(comment);
        }
    })
}