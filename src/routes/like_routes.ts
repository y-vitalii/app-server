import {addLike, getLikeByUserAndPost, deleteLike} from "../controllers/like";


const likeRoutes = (app: any) => {

    app.get('/like/:postId/:userId', getLikeByUserAndPost);

    app.post('/like', addLike);

    app.delete('/like/:id', deleteLike);
}

export default likeRoutes;