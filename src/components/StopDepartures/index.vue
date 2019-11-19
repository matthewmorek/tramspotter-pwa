<template>
  <div class="departures">
    <header class="departures-header">
      <h4 class="departures-header--title">Departures</h4>
      <div v-if="isLive" class="departures-header--live">
        <icon-record width="12" height="12" />LIVE
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
import IconRecord from '../../public/record.svg';

export default {
  components: {
    Departure,
    IconRecord
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
  margin-top: 1rem;
  margin-bottom: 1rem;

  &-header {
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    border-bottom: 1px solid var(--header-color-border);
    padding-bottom: 0.25rem;
    color: var(--text-color-dimmed);

    &--title {
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      line-height: 1.5;
      padding-top: 0.25rem;
      padding-bottom: 0.25rem;
    }

    &--live {
      display: flex;
      border: 1px solid var(--text-color);
      border-radius: 3px;
      padding: 0.125rem 0.33rem;
      font-size: 0.75rem;
      font-weight: 500;
      letter-spacing: 1px;
      animation: 1s ease-in-out infinite alternate breathe;
      line-height: 1.5;
      text-transform: uppercase;
      align-items: center;

      svg {
        fill: var(--color-red);
        display: inline-block;
        margin-right: 0.125rem;
      }
    }
  }

  &-timetable {
    margin-top: 0.5rem;
    margin-top: 0.225rem;
  }
}

@keyframes breathe {
  from {
    opacity: 1;
  }

  to {
    opacity: 0.3;
  }
}
</style>
