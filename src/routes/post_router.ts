import {upload} from "../middlewares/multer-config";
import {addPost, deletePost, getAllPost, getAllPostData, getPostById, updatePost} from "../controllers/post";


const postRoutes = (app: any) => {

    app.get('/post', getAllPost);

    app.get('/post/data/:id', getAllPostData);

    app.get('/post/:id', getAllPostData);

    app.post('/post', upload.array("file"), addPost);

    app.put('/post', updatePost);

    app.delete('/post/:id', deletePost);
};

export default postRoutes;