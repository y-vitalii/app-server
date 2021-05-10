import {getDb} from "../db";

const checkDuplicateUserNameOrEmail = (req: any, res: any, next: any) => {
    // getDb().collection('users').findOne({email: req.body.email}, (err: any, user: any) => {
    //     if (err) {
    //         res.send({'error': 'An error has occurred'});
    //     } else {
    //         if (user) {
    //             res.status(400).send({message: "Failed! Username is already in use!"});
    //             return;
    //         }
    //         next();
    //     }
    // });
    next();
};

const verifySignUp = {
    checkDuplicateUserNameOrEmail
};

export default verifySignUp;
