<template>
  <div
    class="delivery"
  >
    <div class="delivery__wrapper">
      <div class="delivery__title">
        {{ content.delivery.title }}
      </div>
      <div class="delivery__buttons">
        <div
          v-for="button in content.delivery.buttons"
          :key="button.id"
          class="delivery__button">
          <a
            :href="button.href"
            class="delivery__link"
            :target="button.target"
          >
            {{ button.title }}
          </a>
        </div>
      </div>
      <div class="delivery__void" />
    </div>
  </div>
</template>

<script>
import contentJson from 'static/json/content'

export default {
  name: 'delivery',
  data () {
    return {
      content: contentJson
    }
  },
}
</script>

<style lang="scss">
.delivery {
  margin-top: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  position: relative;
  background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url("static/image/foto/delivery/6835f3d7-d6d9-4cfe-a0ad-048654cc81c8.jpg") no-repeat center;
  background-size: cover;
  &__wrapper {
    height: 100%;
    padding: 22px;
    display: grid;
    flex: 1 0 auto;
    background-color: rgba($black, 0.4);
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(2, 1fr);
    @media screen and (min-width: $width-tablet) {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 1fr);
    }
  }
  &__title {
    background: rgba($black, 0.2);
    box-shadow: 0 0 50px rgba($black, 0.5);
    border-radius: 32px;
    color: white;
    letter-spacing: 1px;
    font-weight: 400;
    grid-area: 1 / 2 / 2 / 3;
    padding: 16px;
    margin: auto 0;
    font-size: 16px;
    line-height: 22px;
    @media screen and (min-width: $width-mobile) {
      line-height: 32px;
      padding: 24px;
    }
  }
  &__buttons {
    width: 100%;
    margin: 16px auto;
    grid-area: 2 / 2 / 3 / 3;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-evenly;
  }
  &__button {
    margin: 8px;
  }
  &__link {
    text-decoration: none;
    border: 1px solid $white;
    border-radius: 6px;
    padding: 10px;
    color: $white;
    letter-spacing: 0.8px;
    font-size: 12px;
    background-color: rgba($brown, 0.2);
    @media screen and (min-width: $width-mobile) {
      font-size: 14px;
    }
  }
  &__link:hover {
    cursor: pointer;
    border: 1px solid $brown;
  }
  &__void {
    grid-area: 1 / 1 / 3 / 2;
  }
  &__img {
    width: 90%;
    height: 90%;
  }
}
</style>
