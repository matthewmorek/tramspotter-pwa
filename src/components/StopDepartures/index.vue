<template>
  <div class="departures">
    <header class="departures-header">
      <h4 class="departures-header--title">Departures</h4>
      <div v-if="isLive" class="departures-header--live">
        <IconRecord width="12" height="12" />LIVE
      </div>
    </header>
    <div v-if="!isEmpty(departures)" class="departures-timetable">
      <departure v-for="item in departures" :key="item.id" v-bind="item" />
    </div>
  </div>
</template>

<script>
import isEmpty from 'lodash/fp/isEmpty';
import Departure from './Departure';

export default {
  components: {
    Departure
  },
  props: {
    departures: {
      type: Array,
      required: false,
      default: null
    },
    isLive: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    isEmpty
  }
};
</script>

<style lang="postcss">
.departures {
  &-header {
  }
}
</style>
