import {addComment, getAllComments} from "../controllers/comment";


const commentRouter = (app: any) => {

    app.get('/comment', getAllComments);

    app.post('/comment', addComment);
};

export default commentRouter;