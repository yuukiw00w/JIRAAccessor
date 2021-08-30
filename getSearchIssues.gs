/** 
 * 検索をかけてJIRAチケット一覧を取得
 * JSON.parse(response)してから返却
 * 引数はホスト名、認証用ユーザ名、認証用パスワード、クエリパラメータ（jql=project=TEST AND issuetype=Story AND status!=Closedなど）
 * クエリパラメータはこんな感じ：maxResults=4&fields=issuetype,project,summary&jql=project%20%3D%20TEST%20AND%20issuetype%20%3D%20Story%20AND%20status%20%3D%20Open%20AND%20fixVersion%20%3D%201.0.0
 */
function getSearchIssues(host, userName, pass, parameter) {
  const options = {
    headers: { cookie: getJIRASessionID(host, userName, pass) }
  };
  // https://docs.atlassian.com/software/jira/docs/api/REST/8.8.1/#api/2/search-search
  const response = UrlFetchApp.fetch(
    host + "rest/api/2/search?" + parameter,
    options
  );
  const parse = JSON.parse(response);
  return parse;
}