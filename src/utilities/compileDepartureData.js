import removeEmpty from './removeEmpty';
import uuidv4 from 'uuid/v4';
import isEmpty from 'lodash/fp/isEmpty';
import uniqBy from 'lodash/fp/uniqBy';

export const statusPriority = {
  Due: 0,
  Arrived: 1,
  Departing: 2
};

export const hasPriority = (arrivalA, arrivalB) => {
  if (arrivalA.wait === arrivalB.wait) {
    return statusPriority[arrivalA.status] < statusPriority[arrivalB.status];
  }

  return arrivalA.wait > arrivalB.wait;
};

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
        wait: Number(wait)
      });

      if (!isEmpty(newArrival.destination || newArrival.status)) {
        newArrival['id'] = uuidv4();
        updatedArrivals.push(newArrival);
      }
    }

    updatedArrivals.sort((arrivalA, arrivalB) =>
      hasPriority(arrivalA, arrivalB)
    );

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
        ...removeEmpty({
          distance,
          lastUpdated,
          line,
          messageBoard: messageBoard === '<no message>' ? null : messageBoard,
          stationLocation,
          direction,
          timestamp: Date.now()
        })
      }
    );
  }, {});
}
