const contentNode = document.getElementById('contents');

class IssueFilter extends React.Component {
    render() {
        return (
            <div>This is a placeholder for the Issue Filter.</div>
        )
    }
}

class IssueRow extends React.Component {
    render() {
        const borderedStyle = { border: "1px solid silver", padding: 4 };
        return (
            <tr>
                <td style={borderedStyle}>{this.props.issue_id}</td>
                {/* <td style={borderedStyle}>{this.props.issue_title}</td> */}
                <td style={borderedStyle}>{this.props.children}</td>
            </tr>
        )
    }
    static get propTypes() {
        return {
            issue_id: React.PropTypes.number.isRequired,
            // issue_title: React.PropTypes.string
        }
    }

    static get defaultProps() {
        return {
            issue_title: '$ no title $',
        }
    }
}

// IssueRow.propTypes = {
//     issue_id: React.PropTypes.number.isRequired,
//     issue_title: React.PropTypes.string
// }

class IssueTable extends React.Component {
    render() {
        const borderedStyle = { border: "1px solid silver", padding: 6 };
        return (
            <table style={{ borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th style={borderedStyle}>Id</th>
                        <th style={borderedStyle}>Title</th>
                    </tr>
                </thead>
                <tbody>
                    <IssueRow issue_id={1} />
                    {/* <IssueRow issue_id={2} issue_title="Missing bottom border on panel" /> */}
                    <IssueRow issue_id={2}><span style={{ color: "red" }}>Missing</span> bottom border on panel</IssueRow>
                </tbody>
            </table>
        )
    }
}

class IssueAdd extends React.Component {
    render() {
        return (
            <div>This is a placeholder for an Issue Add entry</div>
        )
    }
}
class IssueList extends React.Component {
    render() {
        return (
            <BorderWrap>
                <h1>Issue Tracker</h1>
                <IssueFilter />
                <hr />
                <IssueTable />
                <hr />
                <IssueAdd />
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
ReactDOM.render(<IssueList />, contentNode);