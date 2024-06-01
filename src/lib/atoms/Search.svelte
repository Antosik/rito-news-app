<script lang="ts">
  export let id: string;
  export let name: string;
  export let value: string;
</script>

<input type="search" {id} {name} bind:value />

<style lang="scss">
  input {
    position: relative;
    display: flex;
    width: 100%;
    min-height: 19pt;
    align-items: center;
    padding: 0 3pt;
    border: 1pt solid lightgray;
    border-radius: 3pt;
    margin: grid(1) 0;
    background: white;
    cursor: text;
    font-size: inherit;

    &:focus {
      border: 1pt solid #{$color-secondary};
      outline: none;
    }
  }
</style>
