<template>
  <div class="index">
    <div class="index__wrapper">
      <div
        v-if="!isShowReserveTable"
        class="index__info"
      >
        <h1 class="index__title">
          {{ titleText }}
        </h1>
        <h2 class="index__description">
          {{ descriptionText }}
        </h2>
        <div class="index__buttons">
          <div
            v-for="button in infoButtons"
            :key="button.id"
            class="index__button"
            @click="clickButtons(button.title)"
          >
            {{ button.title }}
          </div>
        </div>
      </div>
      <div
        v-if="isShowReserveTable"
        class="index__wrapper-RF"
      >
        <div class="index__reserve-table">
          <div
            class="index__close"
            @click="isShowReserveTable = false"
          >
            <img src="/image/close.svg" alt="close">
          </div>
          <h3 class="index__description index__title_reserve">
            {{ reserveTableText.title }}
          </h3>
          <div class="index__description index__description_reserve">
            {{ reserveTableText.content}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import content from 'static/json/content'

export default {
  name: 'Index',
  data () {
    return {
      titleText: content.index.title,
      descriptionText: content.index.description,
      infoButtons: content.index.buttons,
      reserveTableText: content.index.reserveTable,
      isShowReserveTable: false
    }
  },
  methods: {
    clickButtons (event) {
      if (event === this.infoButtons[0].title) {
        this.isShowReserveTable = true
      }
      if (event === this.infoButtons[1].title) {
        this.$router.push('/Delivery')
      }
    }
  }
}
</script>
<style lang="scss">
.index {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  position: relative;
  background: url("static/image/foto/index/Megobari-index_2x.jpg") no-repeat center;
  background-size: cover;
  &__wrapper {
    margin: 24px 12px;
  }
  &__title {
    font-weight: 600;
    &_reserve {
      margin-top: 0;
      text-decoration: underline;
    }
  }
  &__title, &__description {
    max-width: 700px;
    color: #E1F9F9;
    margin-left: 8px;
    font-weight: 200;
    line-height: 26px;
    font-size: 14px;
    letter-spacing: 1px;
    @media screen and (min-width: $width-mobile) {
      font-size: 18px;
    }
    &_reserve {
      margin-left: 0;
    }
  }
  &__buttons {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  &__button {
    border: 1px solid $white;
    padding: 8px;
    margin: 8px;
    color: $white;
    letter-spacing: 0.8px;
    font-size: 12px;
    background-color: rgba($black, 0.2);
    @media screen and (min-width: $width-mobile) {
      font-size: 14px;
    }
  }
  &__button:hover {
    cursor: pointer;
    border: 1px solid $brown;
  }
  &__wrapper-RF {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.4);
  }
  &__close {
    display: inline;
    float: right;
    padding: 4px;
    margin: -22px -32px 0 0;
    border: 2px solid rgba(0, 0, 0, 0);
    img {
      filter: invert(100%);
      width: 38px;
      height: 38px;
    }
  }
  &__close:hover {
    cursor: pointer;
    border: 2px solid #E1F9F9;
  }
  &__reserve-table {
    max-width: 530px;
    max-height: 220px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.5);
    background: rgba(166, 113, 69, 0.5);
    color: #E1F9F9;
    letter-spacing: 0.8px;
    border: 1px solid #E1F9F9;
    padding: 32px 42px;
    margin: calc(50vh + 5% - 260px) auto;
  }
}
</style>
