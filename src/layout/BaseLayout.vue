<template>
  <main class="app-container">
    <header class="app-header">
      <slot name="header"></slot>
    </header>

    <main class="app-main">
      <slot name="default"></slot>
    </main>

    <footer class="app-footer">
      <slot name="footer"></slot>
    </footer>
  </main>
</template>

<script>
export default {};
</script>

<style lang="postcss">
.app-container {
  padding: 1.5rem;
  min-height: 100%;
  max-width: 30em;
  margin: 0 auto;
  display: grid;
  grid-template-areas:
    'header'
    'main'
    'footer';
  grid-template-rows: max-content 1fr max-content;
}

.app-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
  grid-area: header;
}

.app-main {
  display: flex;
  grid-area: main;
  flex-direction: column;
  margin-bottom: 1.5rem;
}

.app-footer {
  grid-area: footer;
  margin-top: auto;
}
</style>
