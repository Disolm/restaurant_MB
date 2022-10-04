<template>
  <div class="index">
    <div class="index__top">
      <div
        v-if="!isShowReserveTable"
        class="index__info"
      >
        <h1 class="index__title">
          {{ content.index.title }}
        </h1>
        <h2 class="index__description">
          {{ content.index.description }}
        </h2>
        <div class="index__buttons">
          <div
            v-for="button in content.index.buttons"
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
        <div
          v-click-outside="onClickOutside"
          class="index__reserve-table"
        >
          <div
            class="index__close"
            @click="isShowReserveTable = false"
          >
            <img src="/image/close.svg" alt="close">
          </div>
          <h3 class="index__description index__title_reserve">
            {{ content.index.reserveTable.title }}
          </h3>
          <h5 class="index__description index__description_reserve">
            {{ content.index.reserveTable.content }}
          </h5>
          <a
            class="index__description index__link"
            :href="content.header.phoneHref"
          >
            <div class="index__button-title">
              {{ content.header.phone }}
            </div>
          </a>
        </div>
      </div>
    </div>
    <div class="index__welcome-slogan">
      <h3 class="index__title index__title_mod">
        {{ content.index.headline.toUpperCase() }}
      </h3>
      <h5 class="index__description index__description_mod">
        {{ content.index.welcomeSlogan }}
      </h5>
    </div>
    <div class="index__gallery-container">
      <img
        v-for="picture in getPictures()"
        :key="picture.id"
        class="index__picture"
        :src="picture.src"
        :alt="content.index.title"
      >
    </div>
    <div class="index__menu-list-buttons">
      <h3 class="index__description">
        {{ content.index.menuInfo.title.toUpperCase() }}
      </h3>
      <h5 class="index__description">
        {{ content.index.menuInfo.description }}
      </h5>
      <div class="index__buttons index__buttons_positions">
        <nuxt-link
          v-for="button in content.index.menuInfo.buttonsMenu"
          :key="button.id"
          class="index__button"
          :to="button.url"
        >
          {{ button.title }}
        </nuxt-link>
      </div>
    </div>
    <div class="index__sale">
      <h3 class="index__title index__title_mod">
        {{ content.index.sale.title.toUpperCase() }}
      </h3>
      <h5 class="index__description index__description_mod">
        {{ content.index.sale.description }}
      </h5>
    </div>
    <div class="index__address">
      <div class="index__address-title index__title index__title_mod">
        {{ content.index.address.title }}
      </div>
      <div class="index__address-description index__description index__description_mod">
        <span>
          {{ content.index.address.adds }}
        </span>
        <span>
          {{ content.header.phone }}
        </span>
      </div>
      <div class="index__map">
        <iframe
          class="index__iframe"
          src="https://yandex.ru/map-widget/v1/?um=constructor%3A0496edbd1df2309fbab7a02a463e11160a35220c0af3f8ddd2f4f63e3da01b8d&amp;source=constructor"
          height="100%"
          width="100%"
        />
      </div>
    </div>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'
export default {
  name: 'Index',
  directives: {
    clickOutside: vClickOutside.directive
  },
  async asyncData ({ $axios }) {
    const contentApi = await $axios.$get('/json/content.json')
    return {
      content: contentApi
    }
  },
  data () {
    return {
      isShowReserveTable: false
    }
  },
  methods: {
    clickButtons (event) {
      if (event === this.content.index.buttons[0].title) {
        this.isShowReserveTable = true
      }
      if (event === this.content.index.buttons[1].title) {
        this.$router.push('/Delivery')
      }
    },
    onClickOutside () {
      this.isShowReserveTable = false
    },
    getPictures () {
      const pictures = [...Array(12)]
      pictures.forEach((pic, i) => {
        pictures[i] = Object.assign({}, {
          src: `/image/gallery/${i}.jpg`,
          id: i
        })
      })
      return pictures
    }
  }
}
</script>
<style lang="scss">
.index {
  width: 100%;
  &__top {
    padding-top: calc($height-header-desktop + $height-navbar-desktop);
    //padding-bottom: calc($height-footer);
    height: calc(100vh - $height-header-desktop - $height-navbar-desktop - $main-margin);
    @media screen and (min-width: $width-mobile) {
      margin-top: calc(0px - $height-header-mobile - $height-navbar-mobile - $main-margin - 2px);
      height: calc(100vh - $height-header-mobile - $height-navbar-mobile + $main-margin - 2px - $height-footer);
    }
    width: 100%;
    margin-top: calc($main-margin - $height-header-desktop - $height-navbar-desktop + 2px);
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    position: relative;
    background: url("static/image/foto/index/Megobari-index_2x.jpg") no-repeat center;
    background-size: cover;
  }
  &__info {
    padding: 22px;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  &__title {
    display: block;
    font-weight: 600;
    &_reserve {
      margin-top: 0;
      text-decoration: underline;
    }
  }
  &__title, &__description {
    max-width: $width-tablet;
    color: #E1F9F9;
    margin: 16px;
    font-weight: 200;
    line-height: 26px;
    font-size: 16px;
    letter-spacing: 1px;
    text-align: center;
    @media screen and (min-width: $width-mobile) {
      font-size: 20px;
    }
    &_reserve {
      margin-left: 0;
    }
    &_mod {
      color: $black !important;
    }
  }
  &__buttons {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: center;
    //flex-direction: column;
    @media screen and (min-width: $width-mobile) {
      flex-direction: row;
    }
    width: 100%;
    &_positions {
      justify-content: space-evenly;
      align-content: flex-end;
    }
  }
  &__button, &__link {
    border: 1px solid $white;
    padding: 12px 40px;
    margin: 14px;
    color: $white;
    letter-spacing: 0.8px;
    font-size: 14px;
    background-color: rgba($black, 0.2);
    @media screen and (min-width: $width-mobile) {
      font-size: 16px;
    }
  }
  &__button:hover, &__link:hover {
    cursor: pointer;
    border: 1px solid $brown;
  }
  &__button-title {
    margin: 0 auto;
  }
  &__link {
    display: inline-block;
    margin-left: 0 !important;
    margin-top: 16px;
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
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    max-width: 70vw;
    @media screen and (min-width: $width-tablet) {
      max-width: 530px;
    }
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.5);
    background: rgba(166, 113, 69, 0.5);
    color: #E1F9F9;
    letter-spacing: 0.8px;
    border: 1px solid #E1F9F9;
    padding: 32px 42px;
    margin: calc($height-header-desktop + $height-navbar-mobile + 3 * $main-margin) auto;
  }
  &__welcome-slogan, &__address, &__sale {
    width: 100%;
    min-height: 200px;
    background: $white;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 18px 0;
  }
  &__gallery-container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    width: 90%;
    margin: 0 auto;
    padding: 44px 0;
  }
  &__picture {
    margin: 12px;
    width: 80vw;
    height: 70vw;
    @media screen and (min-width: $width-mobile) {
      width: 38vw;
      height: 38vw;
    }
    @media screen and (min-width: $width-tablet) {
      width: 26vw;
      height: 28vw;
    }
    object-fit: cover;
  }
  &__menu-list-buttons {
    width: 100%;
    height: 110vw;
    background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url("/image/foto/index/foto-menu.jpg") no-repeat fixed left bottom;
    background-size: cover;
    @media screen and (min-width: $width-mobile) {
      height: calc(90vw / 4 * 3);
    }
    @media screen and (min-width: $width-tablet) {
      height: calc(80vw / 4 * 3);
    }
    @media screen and (min-width: $width-desktop) {
      height: calc(70vw / 4 * 3);
    }
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  &__address-description {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    span:last-child {
      display: block;
      margin: 8px;
    }
  }
  &__map {
    width: 90%;
    height: calc(90vw / 4 * 3);
    @media screen and (min-width: $width-mobile) {
      width: 80%;
      height: calc(80vw / 4 * 3);
    }
    @media screen and (min-width: $width-tablet) {
      width: 60%;
      height: calc(60vw / 4 * 3);
    }
    @media screen and (min-width: $width-desktop) {
      width: 50%;
      height: calc(50vw / 4 * 3);
    }
  }
}
</style>
