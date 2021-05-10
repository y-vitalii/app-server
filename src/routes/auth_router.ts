import verifySignUp from "../middlewares/verifySignUp";
import {signin, signup} from "../controllers/auth";


const authRouter = (app: any) => {
    app.use((req: any, res: any, next: any) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/auth/signup", verifySignUp.checkDuplicateUserNameOrEmail, signup);

    app.post("/auth/signin", signin);
}

export default authRouter;