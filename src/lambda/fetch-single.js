import axios from 'axios';
import toCamel from '../utilities/toCamel';

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
