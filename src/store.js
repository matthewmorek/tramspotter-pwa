import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import isNil from 'lodash/fp/isNil';

Vue.use(Vuex);

const autosave = store => {
  store.subscribe((mutation, state) => {
    // Store the state object as a JSON string
    localStorage.setItem('store', JSON.stringify(state));
  });
};

export default new Vuex.Store({
  state: {
    coordinates: {},
    current: {},
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
    update_current_stop(state, props) {
      const { current } = state;
      state.current = Object.assign({}, current, { ...current, ...props });
    },
    update_stops(state, stops) {
      state.stops = stops.reduce((result, obj) => {
        result[obj.atcoCode] = obj;
        return result;
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
              const { atcocode } = response.data.member[0];
              commit('update_current_stop', { atcoCode: atcocode });
            })
            .finally(() => resolve());
        } catch (error) {
          reject(new Error(error));
        }
      });
    },
    setAllStops({ commit, getters }) {
      return new Promise((resolve, reject) => {
        try {
          axios
            .get('/.netlify/functions/fetch-trams')
            .then(async ({ data }) => {
              await commit('update_stops', data);
            })
            .then(() => {
              const stops = getters.currentStops;
              const stopCode = getters.currentStopCode;
              const requestedStopId = stops[stopCode].id;

              if (isNil(requestedStopId))
                reject(new Error('Stop ATCOCODE is missing!'));

              commit('update_current_stop', { id: requestedStopId });
            })
            .finally(() => resolve());
        } catch (error) {
          reject(new Error(error));
        }
      });
    },
    setStopInfo({ commit, getters }) {
      return new Promise((resolve, reject) => {
        try {
          axios
            .get('/.netlify/functions/fetch-single', {
              params: { id: getters.currentStopId }
            })
            .then(({ data }) => {
              commit('update_current_stop', data);
            })
            .catch(error => new Error(error))
            .finally(() => resolve());
        } catch (error) {
          reject(new Error(error));
        }
      });
    }
  },
  getters: {
    currentStopCode: state => state.current.atcoCode,
    currentStopId: state => state.current.id,
    currentStops: state => state.stops
  },
  plugins: [autosave]
});
