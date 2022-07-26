<script lang="ts">
  export let id: string;
  export let name: string;
  export let value: string;
</script>

<input type="search" {id} {name} bind:value />

<style lang="scss">
  input {
    position: relative;
    width: 100%;
    margin: grid(1) 0;
    align-items: center;
    display: flex;
    cursor: text;
    border: 1pt solid lightgray;
    border-radius: 3pt;
    padding: 0 3pt;
    font-size: inherit;
    min-height: 19pt;
  }
</style>
