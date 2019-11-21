import nearbyStops from './nearbyStops';
import compileDepartureData from '../../utilities/compileDepartureData';

export const departuresFactory = () =>
  compileDepartureData(nearbyStops).arrivals;
