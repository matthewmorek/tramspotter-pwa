import axios from 'axios';
// import camelcaseKeys from 'camelcase-keys';

const fetchTram = atcoCode =>
  axios.get('/.netlify/functions/fetch-single', {
    params: { $filter: `AtcoCode eq '${atcoCode}'` }
  });

// eslint-disable-next-line
export async function handler(event, context, callback) {
  const { latitude, longitude } = event.queryStringParameters;
  axios
    .get('https://transportapi.com/v3/uk/places.json', {
      params: {
        app_id: process.env.TA_APP_ID,
        app_key: process.env.TA_APP_KEY,
        lat: latitude,
        lon: longitude,
        type: 'tram_stop',
        query: 'metrolink'
      }
    })
    .then(response => {
      const data = response.data.member.slice(0, 2);
      const requests = data.map(item => fetchTram(item.atcocode));
      axios.all(requests).then(
        axios.spread(function(trams) {
          // Both requests are now complete
          console.log(trams);
        })
      );
    });
}
