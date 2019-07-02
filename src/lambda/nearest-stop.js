import axios from 'axios';
import union from 'lodash/fp/union';
import toCamel from '../utilities/toCamel';
import compileDepartureData from '../utilities/compileDepartureData';

function findNearestStop({ latitude, longitude }) {
  return axios
    .get('https://transportapi.com/v3/uk/places.json', {
      params: {
        app_id: process.env.TA_APP_ID,
        app_key: process.env.TA_APP_KEY,
        lat: latitude,
        lon: longitude,
        type: 'tram_stop'
      }
    })
    .then(response => toCamel(response.data.member.slice(0, 2)))
    .catch(error => console.error(error));
}

function fetchSingleStop(atcoCode) {
  return axios
    .get('https://api.tfgm.com/odata/Metrolinks', {
      params: {
        $filter: `AtcoCode eq '${atcoCode}'`
      },
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.TFGM_API_KEY,
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then(response => toCamel(response.data.value))
    .catch(error => console.error(error));
}

export async function handler(event, context, callback) {
  try {
    const { longitude, latitude } = event.queryStringParameters;
    const nearestTramStopAtco = await findNearestStop({ longitude, latitude });
    const distance = nearestTramStopAtco.reduce((stopA, stopB) =>
      stopA.distance > stopB.distance ? stopA.distance : stopB.distance
    );

    axios
      .all(nearestTramStopAtco.map(({ atcocode }) => fetchSingleStop(atcocode)))
      .then(
        axios.spread((stopA, stopB) => {
          const departureData = compileDepartureData(union(stopA, stopB));
          callback(null, {
            statusCode: 200,
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...departureData, distance })
          });
        })
      );
  } catch (error) {
    callback(null, {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(toCamel(error))
    });
  }
}
