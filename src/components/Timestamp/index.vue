<template>
  <div class="update-timestamp">Updated {{ lastUpdate }} ago</div>
</template>

<script>
export default {
  props: {
    lastUpdate: {
      type: String,
      required: false,
      default: null
    }
  }
};
</script>

<style lang="postcss">
.update-timestamp {
  font-size: 0.75rem;
  font-weight: 500;
  text-align: center;
}
</style>
