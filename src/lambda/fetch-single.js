import axios from 'axios';

function toCamel(o) {
  var newO, origKey, newKey, value;
  if (o instanceof Array) {
    return o.map(function(value) {
      if (typeof value === 'object') {
        value = toCamel(value);
      }
      return value;
    });
  } else {
    newO = {};
    for (origKey in o) {
      if (o.hasOwnProperty(origKey)) {
        newKey = (
          origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey
        ).toString();
        value = o[origKey];
        if (
          value instanceof Array ||
          (value !== null && value.constructor === Object)
        ) {
          value = toCamel(value);
        }
        newO[newKey] = value;
      }
    }
  }
  return newO;
}

export function handler(event, context, callback) {
  const { id } = event.queryStringParameters;
  axios
    .get(`https://api.tfgm.com/odata/Metrolinks(${id})`, {
      headers: {
        'Ocp-Apim-Subscription-Key': 'aee97b95e83747b3997f2131137abcfe',
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then(response =>
      callback(null, {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(toCamel(response.data))
      })
    )
    .catch(error => console.error(error));
}
