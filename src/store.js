import Vue from 'vue';
import Vuex from 'vuex';
import VueWait from 'vue-wait';
import axios from 'axios';
import uuidv4 from 'uuid/v4';
import { isEmpty } from 'lodash/fp';

Vue.use(Vuex);
Vue.use(VueWait);

const autosave = store => {
  store.subscribe((mutation, state) => {
    // Store the state object as a JSON string
    localStorage.setItem('store', JSON.stringify(state));
  });
};

const removeEmpty = obj =>
  Object.keys(obj)
    .filter(k => obj[k] !== null && obj[k] !== undefined && obj[k] !== '') // Remove undef. and null.
    .reduce(
      (newObj, k) =>
        typeof obj[k] === 'object'
          ? Object.assign(newObj, { [k]: removeEmpty(obj[k]) }) // Recurse.
          : Object.assign(newObj, { [k]: obj[k] }), // Copy value.
      {}
    );

export default new Vuex.Store({
  state: {
    coordinates: {},
    selected: {},
    compiled: {},
    stops: {}
  },
  mutations: {
    init_store(state) {
      if (localStorage.getItem('store')) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem('store')))
        );
      }
    },
    update_coordinates(state, { lat, lng }) {
      state.coordinates = {
        ...state.coordinates,
        latitude: lat,
        longitude: lng
      };
    },
    create_selected_stops(state, stops) {
      state.selected = stops.reduce((result, obj) => {
        result[obj.atcoCode] = obj;
        return result;
      }, {});
    },
    update_selected_stops(state, stop) {
      const { selected } = state;
      const currentStop = selected[stop.atcoCode];
      state.selected = Object.assign({}, selected, {
        [stop.atcoCode]: { ...currentStop, ...stop }
      });
    },
    update_stops(state, stops) {
      state.stops = stops.reduce((result, obj) => {
        result[obj.atcoCode] = obj;
        return result;
      }, {});
    },
    update_compiled_data(state, stops) {
      state.compiled = stops.reduce((results, obj) => {
        const { arrivals } = results;
        const updatedArrivals = isEmpty(arrivals) ? [] : [].concat(arrivals);

        for (let i = 0; i < 4; i++) {
          const fields = [
            `carriages${i}`,
            `dest${i}`,
            `status${i}`,
            `wait${i}`
          ];

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
  },
  actions: {
    setCoordinates({ commit }, { coordinates }) {
      commit('update_coordinates', coordinates);
    },
    setStopCode({ commit, state }) {
      return new Promise((resolve, reject) => {
        try {
          const { latitude, longitude } = state.coordinates;
          axios
            .get('https://transportapi.com/v3/uk/places.json', {
              params: {
                app_id: '63ef49e1',
                app_key: 'b657d1ba2817c35cf3c85f412d1d277a',
                lat: latitude,
                lon: longitude,
                type: 'tram_stop'
              }
            })
            .then(response => {
              const stops = [];
              const data = response.data.member.slice(0, 2);
              data.forEach(function(item) {
                const { atcocode, distance } = item;
                stops.push({ atcoCode: atcocode, distance });
              });

              commit('create_selected_stops', stops);
            })
            .finally(() => resolve());
        } catch (error) {
          reject(new Error(error));
        }
      });
    },
    setAllStops({ commit, getters, dispatch }) {
      return new Promise((resolve, reject) => {
        try {
          axios
            .get('/.netlify/functions/fetch-trams')
            .then(async ({ data }) => {
              await commit('update_stops', data);
            })
            .then(() => {
              const stops = getters.availableStops;
              const selectedStops = getters.selectedStopsAtco.map(
                stop => stops[stop].id
              );

              dispatch('setStopInfo', selectedStops);
            })
            .finally(() => resolve());
        } catch (error) {
          reject(new Error(error));
        }
      });
    },
    setStopInfo({ commit, getters }, selectedStops) {
      return new Promise((resolve, reject) => {
        selectedStops.map(id => {
          try {
            axios
              .get('/.netlify/functions/fetch-single', {
                params: { id }
              })
              .then(({ data }) => {
                commit('update_selected_stops', data);
              })
              .catch(error => new Error(error))
              .finally(() => {
                commit('update_compiled_data', getters.selectedStops);
                resolve();
              });
          } catch (error) {
            reject(new Error(error));
          }
        });
      });
    }
  },
  getters: {
    availableStops: state => state.stops,
    selectedStops: state => Object.values(state.selected),
    selectedStopsAtco: state =>
      Object.values(state.selected).map(stop => stop.atcoCode),
    getDistanceToStop: state => {
      const { distance } = state.compiled;
      let readableDistance = (distance / 1609.344).toFixed(2);
      return readableDistance;
    },
    getDepartures: state => {
      const { arrivals } = state.compiled;
      let departures = arrivals
        .filter(tram => tram.wait !== 0)
        .sort((a, b) => a.wait > b.wait);

      return departures;
    },
    getTimestamp: state => state.compiled.timestamp
  },
  plugins: [autosave]
});
