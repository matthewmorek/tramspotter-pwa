<template>
  <div class="timetable-item">
    <div class="timetable-item--destination">
      {{ destination }}
    </div>
    <div class="timetable-item--info">
      <span class="timetable-item--carriages">
        {{ carriages }}
      </span>
      <span
        class="timetable-item--wait"
        :class="{ near: wait <= 5 || wait === null }"
      >
        {{ wait > 0 ? `${wait} min` : status }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true,
      default: null
    },
    destination: {
      type: String,
      required: true,
      default: null
    },
    carriages: {
      type: String,
      required: true,
      default: null
    },
    wait: {
      type: Number,
      required: true,
      default: null
    },
    status: {
      type: String,
      required: true,
      default: null
    }
  }
};
</script>

<style lang="postcss">
.timetable-item {
  display: flex;
  justify-content: space-between;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

  &--destination {
    font-size: 1rem;
    font-weight: 500;
  }

  &--carriages {
    font-size: 0.875rem;
  }

  &--wait {
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: 64px;
    color: var(--pill-color-text);
    background-color: var(--pill-color-bg);
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    padding-left: 0.625rem;
    padding-right: 0.625rem;
    margin-left: 0.5rem;

    &.near {
      background-color: var(--pill-color-bg--special);
      color: var(--pill-color-text--special);
    }
  }
}
</style>
