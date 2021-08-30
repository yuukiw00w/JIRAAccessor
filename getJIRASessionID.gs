/**
 * host, user名, パスワードを入れるとrest/auth/1/sessionを叩いてcookies[0]を返す
 * ヘッダーにcookieとしてこの返り値を入れれば認証が通る
 * 権限要確認のこと
 * 例：host = 'https://jira.***.jp/'
 */
function getJIRASessionID(host, userName, pass) {
  const body = {
    username: userName,
    password: pass
  };
  const headers = {
    Accept: "application/json"
  };
  const options = {
    payload: JSON.stringify(body),
    muteHttpExceptions: true,
    contentType: "application/json",
    headers: headers,
    method: "post"
  };
  const response = UrlFetchApp.fetch(
    host + "rest/auth/1/session",
    options
  );
  const responseHeaders = response.getAllHeaders();
  let cookies = [];
  if (typeof responseHeaders["Set-Cookie"] !== "undefined") {
    cookies =
      typeof responseHeaders["Set-Cookie"] == "string"
        ? [responseHeaders["Set-Cookie"]]
        : responseHeaders["Set-Cookie"];
    for (var i = 0; i < cookies.length; i++) {
      cookies[i] = cookies[i].split(";")[0];
    }
  }
  return cookies[0];
}