// @ts-ignore
const ObjectID = require('mongodb').ObjectID;

module.exports = function (app: any, db: any) {

    app.get('/notes/:id', (req: any, res: any) => {
        const details = {'_id': new ObjectID(req.params.id)};
        db.collection('notes').findOne(details, (err: any, item: any) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(item);
            }
        });
    });

    app.post('/notes', (req: any, res: any) => {
        const note = {text: req.body.text, title: req.body.title};

        db.collection('notes').insertOne(note, (err: any, result: { ops: string[]; }) => {
            if (err) {
                res.send(err);
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    app.put('/notes/:id', (req: any, res: any) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        const note = {text: req.body.body, title: req.body.title};
        db.collection('notes').update(details, note, (err: any, result: any) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(note);
            }
        });
    });

    app.delete('/notes/:id', (req: any, res: any) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        db.collection('notes').remove(details, (err: any, item: any) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send('Note ' + id + ' deleted!');
            }
        });
    });
};