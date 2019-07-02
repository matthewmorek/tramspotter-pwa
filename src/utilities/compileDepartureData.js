import removeEmpty from './removeEmpty';
import uuidv4 from 'uuid/v4';
import isEmpty from 'lodash/fp/isEmpty';

export default function(stops) {
  return stops.reduce((results, obj) => {
    const { arrivals } = results;
    const updatedArrivals = isEmpty(arrivals) ? [] : [].concat(arrivals);

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

      if (!isEmpty(newArrival)) {
        newArrival['id'] = uuidv4();
        updatedArrivals.push(newArrival);
      }
    }

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
