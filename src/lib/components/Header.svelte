<header>
  <slot name="title" />
  <slot />
</header>

<style lang="scss">
  header {
    position: sticky;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: grid(8);
    box-shadow: 1px 2px 2px hsla(216, 15%, 87%, 0.333), 2px 4px 4px hsl(216, 15%, 87%, 0.333),
      3px 6px 6px hsl(216, 15%, 87%, 0.333);
    background: #fff;
    z-index: 3;
  }
</style>
