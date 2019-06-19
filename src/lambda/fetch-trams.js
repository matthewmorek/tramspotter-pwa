import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';

export async function handler() {
  const response = await axios.get('https://api.tfgm.com/odata/Metrolinks', {
    params: { $select: 'Id,AtcoCode,StationLocation' },
    headers: {
      'Ocp-Apim-Subscription-Key': 'aee97b95e83747b3997f2131137abcfe'
    }
  });
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(camelcaseKeys(response.data.value))
  };
}
