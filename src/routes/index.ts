import authRouter from './auth_router';
import postRoutes from './post_router';
import commentRouter from "./comment_router";
import likeRoutes from "./like_routes";

module.exports = (app: any) => {
    authRouter(app);
    postRoutes(app);
    commentRouter(app);
    likeRoutes(app);
};