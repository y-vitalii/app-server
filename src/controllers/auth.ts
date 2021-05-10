import {secretKey} from "../config/auth";
import User, {IUser} from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


export const signup = (req: any, res: any) => {
    const user: IUser = req.body;
    user.password = bcrypt.hashSync(user.password, 8)

    const userDb = new User(user);

    userDb.save((err: any) => {
        if (err) {
            res.status(500).send({message: err});
        } else {
            res.send({message: "User was registered successfully!"});
        }
    })
};

export const signin = (req: any, res: any) => {
    User.findOne({email: req.body.email}, (err: any, user: any) => {
        if (err) {
            res.send({'error': 'An error has occurred'});
        } else {
            if (err) {
                res.status(500).send({message: err});
                return;
            }

            if (!user) {
                // TODO: check if it works
                return res.status(404).send({message: "User Not found."});
            }

            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            const token = jwt.sign({id: user._id}, secretKey, {
                expiresIn: 86400 // 24 hours
            });

            res.status(200).send({
                id: user._id,
                name: user.name,
                email: user.email,
                accessToken: token
            });
        }
    })
};
