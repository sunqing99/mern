express = require('express');
const app = express();

// const stringifyReplacer = function (key, value) {
//     if (typeof value === 'object' && value !== null) {
//         if (cache.indexOf(value) !== -1) {
//             // Duplicate reference found
//             try {
//                 // If this value does not reference a parent it can be deduped
//                 return JSON.parse(JSON.stringify(value));
//             } catch (error) {
//                 // discard key if value cannot be deduped
//                 return;
//             }
//         }
//         // Store value in our collection
//         cache.push(value);
//     }
//     return value;
// }
// let cache = []; 

app.use(express.static('static'));

const issues = [
    {
        id: 1,
        status: 'Open',
        owner: 'Ravan',
        created: new Date('2016-08-15'),
        effort: 5,
        completionDate: undefined,
        title: 'Error in console when clicking Add',
    },
    {
        id: 2,
        status: 'Assigned',
        owner: 'Eddie2',
        created: new Date('2016-08-16'),
        effort: 14,
        completionDate: new Date('2016-08-30'),
        title: 'Missing bottom border on panel'
    }
];

const bodyParser = require('body-parser');
var serveIndex = require('serve-index');

// app.use('/static', serveIndex('static')); // shows you the file list
app.use(bodyParser.json());
app.use((err, req, res, next) => {
    if (err) {
        console.log('Invalid Request data')
        res.send('Invalid Request data')
    } else {
        next()
    }
})
app.use('/static', express.static('static')); // serve the actual files
app.use('/', express.static('root'));
app.set('json spaces', 4);
app.get('/api/issues', (req, res) => {
    const metadata = {
        total_count: issues.length
    }
    console.log('About to send API response');
    res.json({
        _metadata: metadata,
        records: issues
    })
});

app.post('/api/issues', (req, res) => {
    const newIssue = req.body;
    newIssue.id = issues.length + 1;
    newIssue.created = new Date();
    if (!newIssue.status) {
        newIssue.status = 'New';
    }
    issues.push(newIssue);
    res.json(newIssue);
});

app.get('/hello/:Name', (req, res) => {
    let selectedReqFields = {
        query: req.query,
        header: req.headers,
        path: req.path,
        url: req.url,
        body: req.body,
        params: req.params,
    }
    console.log(JSON.stringify(selectedReqFields, null, 2));
    const chromeVer = req.get('user-agent').replace(/.*Chrome\/([^ ]*) .*/, '$1');
    res.send(`Hello World ${req.params.Name}, you Chrome version is ${chromeVer}`);
});

var port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log('App started on port ', port);
});
