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
      const { latitude, longitude } = state.coordinates;
      return new Promise(resolve => {
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
      });
    },
    setAllStops({ commit, state }) {
      return new Promise(resolve => {
        axios
          .get('/.netlify/functions/fetch-trams')
          .then(({ data }) => {
            commit('update_stops', data);
          })
          .then(() => {
            const { stops, current } = state;
            const requestedStopId = stops[current.atcoCode].id;
            commit('update_current_stop', { id: requestedStopId });
          })
          .finally(() => resolve());
      });
    },
    setStopInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        const { id } = state.current;
        if (!isNil(id)) {
          axios
            .get(`/.netlify/functions/fetch-single?id=${id}`)
            .then(({ data }) => {
              commit('update_current_stop', data);
            })
            .finally(() => resolve());
        } else {
          reject(new Error('Stop ID is missing!'));
        }
      });
    }
  },
  plugins: [autosave]
});
