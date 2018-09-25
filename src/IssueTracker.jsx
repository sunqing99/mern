const contentNode = document.getElementById('contents');

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
        owner: 'Eddie',
        created: new Date('2016-08-16'),
        effort: 14,
        completionDate: new Date('2016-08-30'),
        title: 'Missing bottom border on panel'
    }
];

let hdrText = 'Issue Tracker';
let otherText = 'Some other text';

class IssueFilter extends React.Component {
    render() {
        return (
            <div>This is a placeholder for the Issue Filter.</div>
        )
    }
}

class OtherHeader extends React.Component {
    render() {
        console.log(`rendering OtherHeader`);
        return (
            <h1 id="otherText">{otherText}</h1>
        );
    }
}

const IssueRow = props => (
    <tr>
        <td>{props.issue.id}</td>
        <td>{props.issue.status}</td>
        <td>{props.issue.owner}</td>
        <td>{props.issue.created.toDateString()}</td>
        <td>{props.issue.effort}</td>
        <td>{props.issue.completionDate ? props.issue.completionDate.toDateString() : "Not completed"}</td>
        <td>{props.issue.title}</td>
    </tr>
)

function IssueTable(props) {
    const issueRows = props.issues.map(
        issue => <IssueRow key={issue.id} issue={issue} />
    )
    // const borderedStyle = { border: "1px solid silver", padding: 6 };
    return (
        // <table style={{ borderCollapse: "collapse" }}>
        <table className="bordered-table">
            <thead>
                <tr>
                    {/* <th style={borderedStyle}>Id</th>
                        <th style={borderedStyle}>Title</th> */}
                    <th>Id</th>
                    <th>Status</th>
                    <th>Owner</th>
                    <th>Created</th>
                    <th>Effort</th>
                    <th>Completion Date</th>
                    <th>Title</th>
                </tr>
            </thead>
            <tbody>
                {issueRows}
            </tbody>
        </table>
    )
}

class IssueAdd extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        let form = document.forms.issueAdd;
        this.props.createIssue({
            owner: form.owner.value,
            title: form.title.value,
            status: 'New',
            created: new Date(),
        });
        // clear the form for the next input
        form.owner.value = "";
        form.title.value = "";
    }
    render() {
        console.log('Rendering IssueAdd')
        return (
            <div>
                <form name="issueAdd" onSubmit={this.handleSubmit}>
                    <input type="text" name="owner" placeholder="Owner" />
                    <input type="text" name="title" placeholder="Title" />
                    <button>Add</button>
                </form>
            </div>
        )
    }
}
class IssueList extends React.Component {
    constructor() {
        super();
        this.state = { issues: [] };
        this.createIssue = this.createIssue.bind(this);
        // this.createTestIssue = this.createTestIssue.bind(this);
        // setTimeout(this.createTestIssue, 3000);
    }
    componentDidMount() {
        this.loadData();
    }
    loadData() {
        setTimeout(() => {
            this.setState({ issues: issues });
        }, 500);
    }
    createIssue(newIssue) {
        const newIssues = this.state.issues.slice();
        newIssue.id = this.state.issues.length + 1;
        newIssues.push(newIssue);
        hdrText = 'header changed'; // will re-render
        otherText = 'other changed'; // does not re-render
        this.setState({ issues: newIssues });
    }
    // createTestIssue() {
    //     this.createIssue({
    //         status: 'New',
    //         owner: 'Pieta',
    //         created: new Date(),
    //         title: 'Completion date should be optional',
    //     });
    // }
    render() {
        return (
            <BorderWrap>
                <h1 id="hdr">{hdrText}</h1>
                <IssueFilter />
                <hr />
                <IssueTable issues={this.state.issues} />
                {/* <IssueTable issues={this.state.issues} /> */}
                {/* <button onClick={this.createTestIssue}>Add</button> */}
                <hr />
                <IssueAdd createIssue={this.createIssue} />
            </BorderWrap>
        );
    }
}

class BorderWrap extends React.Component {
    render() {
        const borderStyle = { border: "1px solid blue", padding: 6 };
        return (
            <div style={borderStyle}>
                {this.props.children}
            </div>
        )
    }
}
ReactDOM.render(
    <div>
        <OtherHeader />
        <IssueList />
    </div>,
    contentNode);