import bugsnag from '@bugsnag/js';
import axios from 'axios';
import union from 'lodash/fp/union';
import toCamel from '../utilities/toCamel';
import compileDepartureData from '../utilities/compileDepartureData';
import { MIN_LAT, MIN_LNG, MAX_LAT, MAX_LNG, TAPI_QUERY } from '../constants';

const bugsnagClient = bugsnag({
  apiKey: process.env.VUE_APP_BUGSNAG_ID,
  appVersion: process.env.VUE_APP_VERSION,
  appType: 'client',
  collectUserIp: false
});

function findNearestStop({ latitude, longitude }) {
  return axios
    .get('https://transportapi.com/v3/uk/places.json', {
      params: {
        app_id: process.env.TA_APP_ID,
        app_key: process.env.TA_APP_KEY,
        lat: latitude,
        lon: longitude,
        min_lat: MIN_LAT,
        min_lng: MIN_LNG,
        max_lat: MAX_LAT,
        max_lng: MAX_LNG,
        type: 'tram_stop',
        query: TAPI_QUERY
      }
    })
    .then(response => toCamel(response.data.member.slice(0, 2)))
    .catch(error =>
      bugsnagClient.notify(new Error(error), {
        statusCode: 500
      })
    );
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
    .catch(error =>
      bugsnagClient.notify(new Error(error), {
        statusCode: 500
      })
    );
}

// TODO: Investigate why ES6 async function export doesn't return anything without a callback
export async function handler(event, context, callback) {
  try {
    const { longitude, latitude } = event.queryStringParameters;
    const [rawStopA, rawStopB] = await findNearestStop({ longitude, latitude });

    const distance =
      rawStopA.distance > rawStopB.distance
        ? rawStopA.distance
        : rawStopB.distance;

    const [stopA, stopB] = await Promise.all(
      [rawStopA, rawStopB].map(({ atcocode }) => fetchSingleStop(atcocode))
    );

    const departureData = {
      ...compileDepartureData(union(stopA, stopB)),
      distance
    };

    // return {
    //   statusCode: 200,
    //   body: JSON.stringify(departureData)
    // };

    callback(null, {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(departureData)
    });
  } catch (error) {
    callback(bugsnagClient.notify(new Error(error)), {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(error)
    });
  }
}
