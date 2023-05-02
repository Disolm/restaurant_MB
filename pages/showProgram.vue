<template>
  <div class="show-program">
    <div class="show-program__wrapper">
      <div class="show-program__left-top-block"/>
      <transition-group name="slide-fade" class="show-program__right-top-block">
        <template v-if="isLoading">
          <div class="show-program__title" key="keyTitle">
            {{ content.showProgram.title }}
          </div>
          <div
            class="show-program__description"
            v-for="(text, idx) in content.showProgram.description"
            :key="idx"
          >
            {{ text }}
          </div>
        </template>
      </transition-group>
      <div class="show-program__bottom-block">
        <div
          class="show-program__picture-containers"
        >
          <div
            v-for="picture in images"
            :key="picture.id"
            class="show-program__picture-container"
          >
            <div
              @click="openModalImage(picture.id)"
              class="show-program__picture"
            >
              <picture>
                <source
                  media="(min-width:768px)"
                  :srcset="picture.srcAvif"
                  type="image/avif"
                >
                <source
                  media="(min-width:768px)"
                  :srcset="picture.src"
                  type="image/jpg"
                >
                <source
                  :srcset="picture.srcMiniAvif"
                  type="image/avif"
                >
                <source
                  :srcset="picture.srcMini"
                  type="image/jpg"
                >
                <img
                  :src="picture.src"
                  alt="Sa'MegoBro"
                  class="show-program__img"
                >
              </picture>
            </div>
          </div>
        </div>
      </div>
      <ModalImage
        :array-src-images = "images"
        :index-image-active = "indexImageActive"
        :is-active-modal = "isActiveModal"
        @modalClose = "isActiveModal = $event"
        @newIndex = "indexImageActive = $event"
      />
    </div>
  </div>
</template>

<script>
const ARRAY_LENGTH_GALLERY = 20

export default {
  name: 'show-program',
  async asyncData ({ $axios }) {
    const contentApi = await $axios.$get('/json/content.json')
    return {
      content: contentApi
    }
  },
  data () {
    return {
      isActiveModal: false,
      isLoading: false,
      indexImageActive: 0,
      images: [...Array(ARRAY_LENGTH_GALLERY)]
    }
  },
  created() {
    this.getPictures()
  },
  methods: {
    getPictures () {
      this.images.forEach((pic, i) => {
        this.images[i] = Object.assign({},
          {
            src: `/image/gallery-show/${i}.jpg`,
            srcAvif: `/image/gallery-show/${i}.avif`,
            srcMini: `/image/gallery-show/${i}-mini.jpg`,
            srcMiniAvif: `/image/gallery-show/${i}-mini.avif`,
            id: i,
          })
      })
    },
    openModalImage(indexImg) {
      this.indexImageActive = indexImg
      this.isActiveModal = true
    }
  },
  mounted() {
    this.isLoading = true
  }
}
</script>

<style lang="scss">
.show-program {
  margin-top: 0;
  width: 100%;
  height: auto;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url("/image/background/background-show-program.jpg") 20% 20%;
  background-size: cover;
  transition: height 0.75s ease-in;
  @media screen and (min-width: $width-mobile) {
    background-position: 35% 20%;
  }
  &__wrapper {
    height: 100%;
    padding: 22px;
    display: grid;
    grid-template-columns: 0 1fr;
    grid-template-rows: repeat(2, auto);
    grid-column-gap: 0;
    grid-row-gap: 0;
    @media screen and (min-width: $width-tablet) {
      padding: 44px;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, auto);
    }
  }
  &__left-top-block {
    grid-area: 1 / 1 / 2 / 2;
  }
  &__right-top-block {
    grid-area: 1 / 2 / 2 / 3;
  }
  &__bottom-block {
    grid-area: 2 / 1 / 3 / 3;

    width: 100%;
    height: auto;
    padding: 44px 0;
  }
  &__title {
    margin-bottom: 22px;
    padding: 16px;
    text-indent: 1.5em;
    line-height: 18px;
    letter-spacing: 3px;
    @media screen and (min-width: $width-mobile) {
      line-height: 22px;
    }
  }
  &__description {
    padding: 0 16px;
    line-height: 20px;
    text-indent: 0;
    @media screen and (min-width: $width-desktop) {
      line-height: 26px;
    }
  }
  &__title, &__description {
    background: rgba($black, 0.3);
    box-shadow: 0 0 50px rgba($black, 1);
    border-radius: 32px;
    color: $white;
    font-size: 16px;
    @media screen and (min-width: $width-desktop) {
      font-size: 20px;
    }
  }
  &__picture-containers {
    width: 100%;
    height: auto;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  &__picture-container {
    display: flex;
    justify-content: center;
    margin: 12px 0;
    width: 100%;
    height: 50vw;
    @media screen and (min-width: $width-mobile) {
      width: calc(50% - 24px);
      height: 40vw;
    }
    @media screen and (min-width: $width-tablet) {
      width: calc(33% - 24px);
      height: 20vw;
    }
  }
  &__picture {
    border-radius: 6px;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    -webkit-filter: sepia(0);
    filter: sepia(0);
    -webkit-transition: .3s ease-in-out;
    transition: .3s ease-in-out;
    overflow: hidden;
    background: linear-gradient( rgba($turquoise, 0.1), rgba($turquoise, 0.5) ), url("/loading-gif.gif") no-repeat center;
    background-size: 15%;
    &:hover {
      cursor: pointer;
      -webkit-filter: sepia(100%);
      filter: sepia(100%);
    }
  }
  &__img {
    display: block;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
}
</style>
