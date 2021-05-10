// @ts-ignore
// tslint:disable-next-line:no-var-requires
import {addUser} from "../controllers/user";

const ObjectID = require('mongodb').ObjectID;

interface User {
    _id?: string
    name: string,
    email: string,
    password: string
}

module.exports = function (app: any, db: any) {

    app.get('/users', (req: any, res: any) => {
        db.collection('users').find({}).toArray((err: any, item: any) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(item);
            }
        });
    });

    app.get('/users/:id', (req: any, res: any) => {
        const details = {'_id': new ObjectID(req.params.id)};
        db.collection('users').findOne(details, (err: any, item: any) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(item);
            }
        });
    });

    app.post('/users', (req: any, res: any) => {
        const user: User = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        };

        addUser(req.body)

        // db.collection('users').insertOne(user, (err: any, result: { ops: string[]; }) => {
        //     if (err) {
        //         res.send(err);
        //     } else {
        //         res.send(result.ops[0]);
        //     }
        // });
    });

    app.put('/users/:id', (req: any, res: any) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        const note = {text: req.body.body, title: req.body.title};
        db.collection('users').update(details, note, (err: any, result: any) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(note);
            }
        });
    });

    app.delete('/users/:id', (req: any, res: any) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        db.collection('users').remove(details, (err: any, item: any) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(id);
            }
        });
    });
};