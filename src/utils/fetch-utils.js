
export function get({
    url,
    query = {}
}) {
    const queryString = formatQueryParams(query);
    const requestURL = `${url}${queryString}`;

    return fetch(requestURL, {
        headers: {
            Accept: 'application/json',
        }
    })
    .then(checkStatus)
    .catch(error => {
        console.error('An unexpected error occured');
        throw error;
    })
}


function formatQueryParams(queryParams) {
    const queryString = Object.keys(queryParams)
        .map(k => `${k}=${queryParams[k]}`)
        .join('&');
    return queryString.length ? '?' + queryString : '';
}


function checkStatus(response) {
    const { status, statusText } = response;
    if (status >= 200 && status < 300) {
        return response.json()
    }

    throw new Error(statusText);
}