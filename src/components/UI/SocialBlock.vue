<script setup>

</script>

<template>
  <div class="social-block">
    <div class="social-block__inner">
      <section class="social-block__text-section">
        <h1 class="social-block__title h1">{{ $t( 'text.social_title' ) }}</h1>
        <h2 class="social-block__subtitle h2">{{ $t( 'text.social_text' ) }}</h2>
      </section>

      <section class="social-block__buttons">
        <a
          class="button"
          href="https://t.me/surodin"
          target="_blank"
        >
          {{ $t( 'button.telegram' ) }}
        </a>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../assets/styles/mixins";

.social-block {
  position: relative;

  &:before {
    background: url('../../assets/images/minion.png');
    background-repeat: no-repeat;
    background-size: 391px;
    bottom: 0;
    content: "";
    display: block;
    height: 100%;
    position: absolute;
    right: 40%;
    width: 391px;
    z-index: 1;

    @include laptop {
      display: none;
    }
  }

  &__inner {
    align-items: center;
    background: #2d303b;
    border-radius: 12px;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    padding: 38px 50px;
    position: relative;
    color: #f2f2f2;

    &:before {
      background: linear-gradient(90deg, #2d303b 38.98%, rgba(0, 108, 217, 0) 38.99%, #006cd9 67.58%, #0089ff 84.43%, #1e8eff);
      border-radius: 12px;
      content: "";
      inset: 0;
      mask-composite: exclude;
      padding: 1px;
      position: absolute;
      width: calc(100% - 2px);
      z-index: 1;
    }

    @include laptop {
      flex-direction: column;
      padding: 12px;
      width: 100%;
    }
  }

  &__text-section, &__buttons {
    z-index: 1;
  }

  &__buttons {
   margin-top: 8px;
  }

  &__title {
    @include phone {
      font-size: 16px;
    }
  }

  &__subtitle {
    @include phone {
      font-size: 14px;
    }
  }
}

</style>