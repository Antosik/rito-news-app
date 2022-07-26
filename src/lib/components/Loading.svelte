<div class="loading">
  <div />
  <div />
  <div />
  <div />
</div>

<style lang="scss">
  :root {
    --size: 80px;
    --border: 8px;
    --color: #{$color-white};
    --speed: 1.2s;
  }

  .loading {
    display: inline-block;
    position: relative;
    width: var(--size);
    height: var(--size);

    div {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: calc(var(--size) - var(--border));
      height: calc(var(--size) - var(--border));
      border: var(--border) solid var(--color);
      border-radius: 50%;
      animation: loading var(--speed) cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: var(--color) transparent transparent transparent;

      &:nth-child(1) {
        animation-delay: calc(var(--speed) * -0.375);
      }
      &:nth-child(2) {
        animation-delay: calc(var(--speed) * -0.25);
      }
      &:nth-child(3) {
        animation-delay: calc(var(--speed) * -0.125);
      }
    }
  }

  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
