import axios from 'axios';

export function handler(event, context, callback) {
  axios
    .get('https://api.tfgm.com/odata/Metrolinks', {
      params: { $select: 'Id,AtcoCode' },
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
        body: JSON.stringify(response.data.value)
      })
    );
}
