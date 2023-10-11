export function getURL(urlData, serviceBaseURL) {
  let url = '';
  try {
    url = new URL(urlData, serviceBaseURL);
    return url.toString();
  } catch (err) {
    console.warn('Error: '+'Url: '+urlData+' baseUrl: '+serviceBaseURL);
  }

  return url;
}

export function checkValidUrl(urlString) {
  let url;
  try {
    url = new URL(urlString);
  } catch (e) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}
