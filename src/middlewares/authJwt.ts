const jwt = require("jsonwebtoken");
const config = require('../config/auth');
// const db = require("../models");

const verifyToken = (req: any, res: any, next: any) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, config.secret, (err: any, decoded: any) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });
};

const authJwt = {
    verifyToken
};

export default authJwt;