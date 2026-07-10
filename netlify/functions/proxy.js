const APP_SCRIPT_URL = process.env.APPS_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbwvOP2A0OoC13ZIOTQRHFnclGL8CCDo9j3xd2Cm1rbnmGg97WMsgVCXwUMzq3pF0XlP/exec';

function buildHeaders(event) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Accept'
  };

  const incoming = event && event.headers ? event.headers : {};
  const contentType = incoming['content-type'] || incoming['Content-Type'];
  if (contentType) {
    headers['Content-Type'] = contentType;
  }
  if (incoming.accept || incoming.Accept) {
    headers.Accept = incoming.accept || incoming.Accept;
  }

  return headers;
}

async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: buildHeaders(event),
      body: ''
    };
  }

  const method = event.httpMethod || 'GET';
  const url = new URL(APP_SCRIPT_URL);

  if (event.queryStringParameters) {
    Object.entries(event.queryStringParameters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, value);
      }
    });
  }

  const requestInit = {
    method,
    headers: buildHeaders(event)
  };

  if (method !== 'GET' && method !== 'HEAD' && event.body) {
    requestInit.body = event.body;
  }

  try {
    const response = await fetch(url.toString(), requestInit);
    const text = await response.text();
    const contentType = response.headers.get('content-type') || 'application/json; charset=utf-8';

    return {
      statusCode: response.status,
      headers: {
        ...buildHeaders(event),
        'Content-Type': contentType
      },
      body: text
    };
  } catch (error) {
    return {
      statusCode: 502,
      headers: {
        ...buildHeaders(event),
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({ status: 'error', message: error.message || 'Proxy request failed' })
    };
  }
}

module.exports = { handler };