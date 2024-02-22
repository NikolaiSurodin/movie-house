<script setup>
import { nav } from '../const/nav'
</script>

<template>
  <div class="mobile-panel">
    <div class="mobile-panel__inner">
      <ul class="mobile-panel__links">
        <li
          v-for="( link, index ) in nav"
          :key="index"
        >
          <router-link :to="link.path" class="mobile-panel__link">
            <component :is="link.icon" class="mobile-panel__link-icon" />
            <span>{{ $t( link.name ) }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.mobile-panel {
  position: fixed;
  bottom: 0;
  z-index: 10;
  width: 100%;
  background-color: var(--color-background);
  opacity: 0.9;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  padding: 8px 30px;

  &__inner {
  }

  &__links {
    display: flex;
    width: 100%;
    justify-content: space-between;
    color: #f2f2f2;
  }

  &__link {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__link-icon {
    font-size: 16px;
  }
}
</style>