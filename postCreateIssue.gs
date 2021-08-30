/** 
 * payload情報を元にチケットを作成
 * payloadはmakeCreateIssuePayloadのように作成のこと
 */
function postCreateIssue(host, userName, pass, payload) {
  const options = {
    method : "post",
    payload : payload,
    contentType: "application/json",
    headers: { cookie: getJIRASessionID(host, userName, pass) }
  };
  // https://docs.atlassian.com/software/jira/docs/api/REST/8.8.1/#api/2/issue-createIssue
  const response = UrlFetchApp.fetch(
    host + "rest/api/2/issue",
    options
  );
  const parse = JSON.parse(response);
  return parse;
}

/** 
 * チケットを作成するためのpayloadの作成関数
 * これら以外の情報で作成したい場合は独自にJSONを作成すること
 */
function makeCreateIssuePayload(projectKey, issueTypeName, summary, fixVersionId, labels, assigneeName) {
  const data = {
    project: {key: projectKey},
    issuetype: {name: issueTypeName},
    summary: summary,
    fixVersions: [ { id: fixVersionId } ],
    labels: labels,
    assignee: { name: assigneeName }
  };
  const fields = {fields: data};
  const payload = JSON.stringify(fields);
  return payload;
}