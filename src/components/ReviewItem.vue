<script setup>
import { NTag } from 'naive-ui'
import { AnFilledStar } from "@kalimahapps/vue-icons"

const props = defineProps( {
  review: {
    type: Object,
    default: () => ( {} )
  }
} )
</script>

<template>
  <div class="review">
    <div class="review__inner">
      <div class="review__header">
        <div class="review__header-inner">
          <div class="review__user-avatar">
            <img :src="review.author_details.avatar_path" alt="avatar">
          </div>
          <div class="review__user-info">
            <div class="review__user-name h2">{{ review.author }}</div>
            <div class="review__public-info">
              <div class="review__rating h3">

              <NTag size="medium" type="success">
                <AnFilledStar />
                {{ review.author_details.rating }}
              </NTag>
              </div>
              <div class="review__created-date">
                Written by {{ review.author }} on
                {{ new Date( review.created_at ).getDate() }}.
                {{ new Date( review.created_at ).getMonth() }}.
                {{ new Date( review.created_at ).getFullYear() }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="review__content" v-html="review.content"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.review {
  background-color: var(--color-background);
  opacity: 0.8;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(1, 90, 185, 0.62);

  &__header-inner {
    display: flex;
  }

  &__user-info {
    margin-left: 18px;
  }

  &__public-info {
    display: flex;
    gap: 18px;
  }

  &__user-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;


    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 1px solid saddlebrown;
      object-fit: cover;
    }
  }
}
</style>