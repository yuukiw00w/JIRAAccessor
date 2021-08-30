/** 
 * 指定projectのversionsを取得
 * JSON.parse(response)してから返却
 * 例：host = 'https://jira.***.jp/'
 */
function getVersion(host, userName, pass, proj) {
  const options = {
    headers: { cookie: getJIRASessionID(host, userName, pass) }
  };
  // https://docs.atlassian.com/software/jira/docs/api/REST/8.8.1/#api/2/project-getProjectVersions
  const response = UrlFetchApp.fetch(
    host + "rest/api/2/project/" + proj + "/versions",
    options
  );
  const parse = JSON.parse(response);
  return parse;
}