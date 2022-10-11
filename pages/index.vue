<template>
  <div class="index">
    <div class="index__top">
      <div
        v-if="!isShowReserveTable"
        class="index__info"
      >
        <h1 class="index__title index__title_color-light">
          {{ content.index.title }}
        </h1>
        <h2 class="index__description index__description_color-light">
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
          <h3 class="index__description index__title_decor">
            {{ content.index.reserveTable.title }}
          </h3>
          <h5 class="index__description index__description">
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
      <h3 class="index__title index__title_color-dark">
        {{ content.index.headline.toUpperCase() }}
      </h3>
      <h5 class="index__description index__description_color-dark">
        {{ content.index.welcomeSlogan }}
      </h5>
    </div>
    <div class="index__gallery-container">
      <img
        v-for="picture in getPictures()"
        :key="picture.id"
        v-scroll="handleScroll"
        class="index__picture animation"
        :src="picture.src"
        :alt="content.index.title"
      >
    </div>
    <div class="index__menu-list-buttons">
      <h3 class="index__title index__title_color-light">
        {{ content.index.menuInfo.title.toUpperCase() }}
      </h3>
      <h5 class="index__description index__description_color-light">
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
      <h3 class="index__title index__title_color-dark">
        {{ content.index.sale.title.toUpperCase() }}
      </h3>
      <div class="index__sale-wrapper">
        <div
          v-for="sale in content.index.sale.description"
          :key="sale.id"
          class="index__sale-block"
          :style="{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${sale.url}`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}"
        >
          <h5
            v-for="(t, idx) in sale.titles"
            :key="idx"
            class="index__description index__description_color-light index__description_margin"
          >
            {{ t }}
          </h5>
        </div>
      </div>
    </div>
    <div class="index__address">
      <div class="index__address-title index__title index__title_color-dark">
        {{ content.index.address.title }}
      </div>
      <div class="index__address-description index__description index__description_color-dark">
        <span>
          {{ content.index.address.adds }}
        </span>
        <span>
          <a
            class="index__description_color-dark"
            :href="content.header.phoneHref"
          >
            {{ content.header.phone }}
          </a>
        </span>
      </div>
      <MapIframe
        class="index__map"
      />
    </div>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'
import MapIframe from '@/components/MapIframe'

export default {
  name: 'Index',
  Components: { MapIframe },
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
          src: `/image/gallery/${i}.JPG`,
          id: i
        })
      })
      return pictures
    },
    handleScroll (evt, el) {
      const factor = 1.8
      if (window.scrollY > el.offsetTop / factor) {
        el.setAttribute(
          'style',
          'opacity: 1; transform: translate3d(0, -10px, 0)'
        )
      }
      return window.scrollY > el.offsetTop / factor
    },
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
    line-height: 46px;
    font-size: 32px;
    &_decor{
      text-decoration: underline;
    }
  }
  &__description {
    line-height: 26px;
    font-weight: 200;
    font-size: 20px;
  }
  &__title, &__description {
    max-width: $width-tablet;
    margin: 16px;
    letter-spacing: 1px;
    text-align: center;
    &_margin {
      margin: 0;
    }
    &_color-light {
      color: $turquoise
    }
    &_color-dark {
      color: $black
    }
  }
  &__buttons {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: center;
    padding: 18px 0;
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
    margin: -22px -32px 0 auto;
    border: 2px solid rgba(0, 0, 0, 0);
    img {
      filter: invert(100%);
      width: 38px;
      height: 38px;
    }
  }
  &__close:hover {
    cursor: pointer;
    border: 2px solid $turquoise;
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
    color: $turquoise;
    letter-spacing: 0.8px;
    border: 1px solid $turquoise;
    padding: 32px 42px;
    margin: calc($height-header-desktop + $height-navbar-mobile + 3 * $main-margin) auto;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    flex-direction: column;
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
    padding: 38px 0;
  }
  &__sale-wrapper {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  &__sale-block {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 16px;
    width: 80vw;
    height: 70vw;
    @media screen and (min-width: $width-tablet) {
      width: 40vw;
      height: 28vw;
    }
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
    min-height: 94vw;
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
}
.animation {
  opacity: 0;
  transition: 1.5s all cubic-bezier(0.39, 0.575, 0.565, 1);
}
</style>
