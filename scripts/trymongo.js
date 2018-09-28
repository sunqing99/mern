'use strict';

const MongoClient = require('mongodb');
const URI = process.env.MONGODB_URI || "mongodb://localhost:27017/playground";
console.log('URI is :', URI);

function usage() {
    console.log('Usage:');
    console.log('node', __filename, '<option>');
    console.log('Where option is one of:');
    console.log('   callbacks -- Use the callbacks paradigm');
    console.log('   promises -- Use the Promises paradigm');
    console.log('   generator -- Use the Generator paradigm');
    console.log('   async -- Use the async module');
    process.exit(1);
}
if (process.argv.length < 3) {
    console.log("Incorrect number of arguments");
    usage();
} else {
    if (process.argv[2] === 'callbacks') {
        testWithCallbacks();
    } else if (process.argv[2] === 'promises') {
        testWithPromises();
    } else if (process.argv[2] === 'generator') {
        testWithGenerator();
    } else if (process.argv[2] === 'async') {
        testWithAsync();
    } else {
        console.log("Invalid option:", process.argv[2]);
        usage();
    }
}

function testWithCallbacks() {
    MongoClient.connect(URI, function (err, client) {
        if (err) {
            console.log("Connection ERROR!");
            throw err;
        }
        const db = client.db(URI.replace(/.*\//, ''));
        db.collection('employees').remove({}, function (err, res) {
            db.collection('employees').insertOne({ id: 4, name: 'D. Callback' }, function (err, result) {
                console.log("Result of insert:", result.insertedId);
                db.collection('employees').find({ id: 4 }).toArray(function (err, docs) {
                    console.log('Result of find', docs);
                    client.close();
                })
            })
        });

    })
}

// function testWithPromises() {
//     let db, conn;
//     MongoClient.connect(URI).then(connection => {
//         conn = connection;
//         db = conn.db(URI.replace(/.*\//, ''));
//         return db.collection('employees').remove({});
//     }).then(res => {
//         return db.collection('employees').insertOne({ id: 1, name: 'B.Promises' });
//     }).then(result => {
//         console.log("Result of insert:", result.insertedId);
//         return db.collection('employees').find({ id: 1 }).toArray();
//     }).then(docs => {
//         console.log('Result of find:', docs);
//         conn.close();
//     }).catch(err => {
//         console.log('ERROR', err);
//     });
// }

function testWithPromises() {
    let db, conn;
    MongoClient.connect(URI).then(connection => {
        conn = connection;
        db = conn.db(URI.replace(/.*\//, ''));
        return db.collection('issues').remove({});
    }).then(res => {
        return db.collection('issues').insertMany([
            {
                status: 'Open',
                owner: 'Ravan',
                created: new Date('2016-08-15'),
                effor: 5,
                completionDate: undefined,
                title: 'Error in console when clicking Add',
            },
            {
                status: 'Assigned',
                owner: 'Eddie',
                created: new Date('2016-08-16'),
                effort: 14,
                completionDate: new Date('2016-08-30'),
                title: 'Missing bottom border on panel',
            }
        ]);
    }).then(result => {
        return db.collection('issues').createIndex({status:1});
    }).then(result => {
        return db.collection('issues').createIndex({owner:1});
    }).then(result => {
        return db.collection('issues').createIndex({created:1});
    }).then(result => {
        console.log("Result of insert:", result.insertedId);
        return db.collection('issues').find({}).toArray();
    }).then(docs => {
        console.log('Result of find:', docs);
        conn.close();
    }).catch(err => {
        console.log('ERROR', err);
    });
}

function testWithGenerator() {
    const co = require('co');
    co(function* () {
        const conn = yield MongoClient.connect(URI);
        const db = conn.db(URI.replace(/.*\//, ''));
        const res = yield db.collection('employees').remove({});
        const result = yield db.collection('employees').insertOne({ id: 1, name: 'C.Generator' });
        console.log('Result of insert:', result.insertedId);
        const docs = yield db.collection('employees').find({ id: 1 }).toArray();
        console.log('Result of find:', docs);
        conn.close();
    }).catch(err => {
        console.log('ERROR', err);
    });
}

function testWithAsync() {
    const async = require('async');
    let db, conn;
    async.waterfall([
        next => {
            MongoClient.connect(URI, next);
        },
        (connection, next) => {
            conn = connection;
            db = conn.db(URI.replace(/.*\//, ''));
            db.collection('employees').remove({}, next);
        },
        (res, next) => {
            db.collection('employees').insertOne({ id: 1, name: 'D.Async' }, next);
        },
        (insertResult, next) => {
            console.log('Inserted result', insertResult.insertedId);
            db.collection('employees').find({ id: 1 }).toArray(next);
        },
        (docs, next) => {
            console.log('Result of find:', docs);
            conn.close();
            next(null, 'All done');
        }
    ], (err, result) => {
        if (err) {
            console.log('ERROR', err);
        } else {
            console.log(result);
        }
    })
}