'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
const validIssueStatus = {
    New: true,
    Open: true,
    Assigned: true,
    Fixed: true,
    Verified: true,
    Closed: true
};

const issueFieldType = {
    status: 'required',
    owner: 'required',
    effort: 'optional',
    created: 'required',
    completionDate: 'optional',
    title: 'required'
};

function validateIssue(issue) {
    for (const field in issueFieldType) {
        const type = issueFieldType[field];
        if (type === 'required' && !issue[field]) {
            return `${field} is required.`;
        }
    }
    for (const field in issue) {
        const type = issueFieldType[field];
        if (!type) {
            delete issue[field];
        }
    }
    if (!validIssueStatus[issue.status]) {
        return `${issue.status} is not a valid status`;
    }
    return null;
}

exports.default = {
    validateIssue: validateIssue
};
//# sourceMappingURL=issue.js.map