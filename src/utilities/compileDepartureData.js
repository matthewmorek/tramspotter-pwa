import removeEmpty from './removeEmpty';
import uuidv4 from 'uuid/v4';
import isEmpty from 'lodash/fp/isEmpty';
import uniqBy from 'lodash/fp/uniqBy';

export default function(stops) {
  const filteredStops = uniqBy('atcoCode', stops);

  return filteredStops.reduce((results, obj) => {
    const { arrivals } = results;
    let updatedArrivals = isEmpty(arrivals) ? [] : [].concat(arrivals);

    for (let i = 0; i < 4; i++) {
      const fields = [`carriages${i}`, `dest${i}`, `status${i}`, `wait${i}`];

      const {
        [fields[0]]: carriages,
        [fields[1]]: destination,
        [fields[2]]: status,
        [fields[3]]: wait
      } = obj;

      const newArrival = removeEmpty({
        carriages,
        destination,
        status,
        wait: wait > 0 ? Number(wait) : null
      });

      if (!isEmpty(newArrival)) {
        newArrival['id'] = uuidv4();
        updatedArrivals.push(newArrival);
      }
    }

    updatedArrivals.sort((arrivalA, arrivalB) => arrivalA.wait > arrivalB.wait);

    const {
      distance,
      lastUpdated,
      line,
      messageBoard,
      stationLocation,
      direction
    } = obj;

    return Object.assign(
      {},
      { ...results },
      {
        arrivals: updatedArrivals,
        distance,
        lastUpdated,
        line,
        messageBoard,
        stationLocation,
        direction,
        timestamp: Date.now()
      }
    );
  }, {});
}
