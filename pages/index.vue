<template>
  <div class="index">
    <div class="index__top">
        <div
          v-if="!isShowReserveTable"
          class="index__info animation-fade"
          v-scroll="{handleScroll, type:'fade'}"
          key="info"
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
      <transition name="fade" mode="out-in">
        <div
          v-if="isShowReserveTable"
          class="index__wrapper-RF"
          key="reserve-table"
        >
          <div
            v-click-outside="onClickOutside"
            class="index__reserve-table"
          >
            <div
              class="index__close"
              @click="isShowReserveTable = false"
            >
              <img src="/image/icon/close.svg" alt="close">
            </div>
            <h3 class="index__description index__title_decor">
              {{ content.index.reserveTable.title }}
            </h3>
            <h5 class="index__description">
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
      </transition>
    </div>
    <div class="index__welcome-slogan">
      <h3
        v-scroll="{handleScroll, type:'slide-fade'}"
        class="index__title index__title_color-dark animation-slide"
      >
        {{ content.index.headline.toUpperCase() }}
      </h3>
      <h5
        v-scroll="{handleScroll, type:'slide-fade'}"
        class="index__description index__description_color-dark animation-slide"
      >
        {{ content.index.welcomeSlogan }}
      </h5>
    </div>
    <div class="index__gallery-container">
      <img
        v-for="picture in getPictures()"
        :key="picture.id"
        v-scroll="{handleScroll, type:'fade'}"
        class="index__picture animation-fade"
        :src="picture.src"
        :alt="content.index.title"
        @click="openModalImage(picture.id)"
      >
    </div>
    <div class="index__translations-container">
      <div
        v-scroll="{handleScroll, type:'fade'}"
        class="animation-fade"
      >
        <h2 class="index__title index__title_color-dark">
          {{ content.index.translations.title }}
        </h2>
        <h4
          v-for="(title, idx) in content.index.translations.contetn"
          :key="idx"
          class="index__translation index__description index__description_color-dark"
        >
          {{ title }}
        </h4>
      </div>
    </div>
    <ModalImage
      :array-src-images = "getPictures()"
      :index-image-active = "indexImageActive"
      :is-active-modal = "isActiveModal"
      @modalClose = "isActiveModal = $event"
      @newIndex = "indexImageActive = $event"
    />
    <div class="index__menu-list-container">
      <div
        v-scroll="{handleScroll, type:'slide-fade'}"
        class="index__menu-list-buttons animation-slide"
      >
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
    </div>
    <div class="index__sale-container">
      <h3 class="index__title index__title_color-dark">
        {{ content.index.sale.title.toUpperCase() }}
      </h3>
      <div class="index__sale-wrapper">
        <client-only>
          <div
            v-for="sale in content.index.sale.descriptionsForImg"
            :key="sale.id"
            class="index__sale-block"
            :style="{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${sale.url}`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}"
          >
            <h5
              v-for="(title, idx) in sale.titles"
              :key="idx"
              class="index__description index__description_color-light index__description_margin"
            >
              {{ title }}
            </h5>
          </div>
        </client-only>
      </div>
    </div>
    <div class="index__show-program">
      <div
        v-scroll="{handleScroll, type:'slide-fade'}"
        class="index__left-block animation-slide"
      >
        <div class="index__title index__title_color-light">
          {{ content.index.showProgram.title }}
        </div>
        <div class="index__description index__description_color-light">
          {{ content.index.showProgram.description }}
        </div>
        <div class="index__buttons">
          <nuxt-link
            class="index__button"
            :to="content.index.showProgram.url"
          >
            {{ content.index.showProgram.more }}
          </nuxt-link>
        </div>
      </div>
      <div class="index__right-block">
        <div
          v-scroll="{handleScroll, type:'fade'}"
          class="index__picture index__picture_inactive index__show-program-img-block index__show-program-img-block_one animation-fade"
        />
        <div
          v-scroll="{handleScroll, type:'fade'}"
          class="index__picture index__picture_inactive index__show-program-img-block index__show-program-img-block_two animation-fade"
        />
      </div>
    </div>
    <div class="index__address">
      <div
        v-scroll="{handleScroll, type:'slide-fade'}"
        class="index__address-title index__title index__title_color-dark animation-slide"
      >
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
      <client-only>
        <MapIframe class="index__map"/>
      </client-only>
    </div>
  </div>
</template>

<script>
const ARRAY_LENGTH_GALLERY = 9
import vClickOutside from 'v-click-outside'
import MapIframe from '@/components/MapIframe'
import ModalImage from '@/components/ModalImage';

export default {
  name: 'Index',
  Components: { MapIframe, ModalImage },
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
      fade: 'fade',
      isShowReserveTable: false,
      isActiveModal: false,
      indexImageActive: 0,
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
      const pictures = [...Array(ARRAY_LENGTH_GALLERY)]
      pictures.forEach((pic, i) => {
        pictures[i] = Object.assign({}, {
          src: `/image/gallery-index/${i}.JPG`,
          id: i
        })
      })
      return pictures
    },
    openModalImage(indexImg) {
      this.indexImageActive = indexImg
      this.isActiveModal = true
    },
    handleScroll (evt, el, type) {
      const HEIGHT_UP_ON = el.offsetTop - window.innerHeight * 0.8
      const HEIGHT_UP_OFF = el.offsetTop - window.innerHeight * 0.7
      const HEIGHT_DOWN_ON = el.offsetTop
      const HEIGHT_DOWN_OFF = el.offsetTop - window.innerHeight * 0.1
      if (window.scrollY > HEIGHT_UP_ON && window.scrollY < HEIGHT_DOWN_ON) {
        if (type === 'fade') {
          el.setAttribute(
            'style',
            // 'opacity: 1; transform: translate3d(0, -10px, 0);'
            'opacity: 1;'
          )
        }
        if (type === 'slide-fade') {
          el.setAttribute(
            'style',
            'opacity: 1; transform: translateX(0);'
          )
        }
      }
      return window.scrollY > HEIGHT_UP_OFF && window.scrollY < HEIGHT_DOWN_OFF
    },
  }
}
</script>
<style lang="scss">
.index {
  width: 100%;
  &__top {
    @include padding-top-main;
    min-height: calc(100vh - $height-header-mobile);
    @media screen and (min-width: $width-mobile) {
      min-height: calc(100vh - $height-header-desktop);
    }
    width: 100%;
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
    text-align: center;
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
    font-size: 16px;
    background-color: rgba($black, 0.2);
    @media screen and (min-width: $width-mobile) {
      font-size: 20px;
    }
    border-radius: 6px;
  }
  &__button:hover, &__link:hover {
    cursor: pointer;
    border: 1px solid $brown;
  }
  &__button:active, &__link:active {
    color: $brown;
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
    margin: $height-header-desktop auto;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    flex-direction: column;
  }
  &__welcome-slogan, &__address, &__sale-container, &__translations-container {
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
    height: 70vh;
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
    align-items: center;
    width: 90%;
    margin: 0 auto;
    padding: 44px 0;
  }
  &__picture:hover {
    cursor: pointer;
    -webkit-filter: sepia(100%);
    filter: sepia(100%);
  }
  &__picture {
    border-radius: 6px;
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
    &_inactive:hover {
      cursor: default;
    }
  }
  &__show-program {
    width: calc(100% - 22px * 2);
    padding: 44px 22px;
    background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url("static/image/foto/index/bg-show-program.jpg") no-repeat center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    @media screen and (min-width: $width-tablet) {
      flex-direction: row;
      max-height: 70vh;
    }
  }
  &__left-block {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  &__right-block {
    flex: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
    @media screen and (min-width: $width-tablet) {
      flex-direction: column;
    }
  }
  &__show-program-img-block {
    border: solid 4px $white;
    border-radius: 2px;
    &_one {
      background: url("static/image/foto/index/photo_one.jpg") no-repeat center;
      background-size: cover;
    }
    &_two {
      background: url("static/image/foto/index/photo_two.jpg") no-repeat center;
      background-size: cover;
    }
  }
  &__menu-list-container {
    width: 100%;
    height: 80vh;
    background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url("static/image/foto/index/foto-menu.jpg") no-repeat fixed left bottom;
    background-size: cover;
    display: flex;
    flex-direction: row;
  }
  &__menu-list-buttons {
    width: 100%;
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
</style>
