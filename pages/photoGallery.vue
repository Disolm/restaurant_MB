<template>
  <div class="photo-gallery">
    <div class="photo-gallery__wrapper">
      <transition name="slide-fade">
          <div
            v-if="isLoadingButtons"
            class="photo-gallery__photo-menu"
            key="keyPhotoMenu"
          >
            <div class="photo-gallery__title">
              {{ content.photoGallery.title.toUpperCase() }}
            </div>
            <div class="photo-gallery__buttons">
              <div
                v-for="btn in content.photoGallery.buttons"
                :key="btn.id"
                class="photo-gallery__button"
                @click="getPictures(btn.type, 'click')"
              >
                {{btn.title}}
              </div>
            </div>
          </div>
      </transition>

      <transition-group
        tag="div"
        name="slide-in"
        class="photo-gallery__pictures"
        key="pictures"
        :style="{ '--total': images.length }">
      >
        <div
          v-for="(picture, i) in images"
          :key="picture.id"
          @click="openModalImage(picture.id)"
          class="photo-gallery__picture"
          :style="{'--i': i}"
          v-if="showItems && i < limit"
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
              alt="megobari"
              class="photo-gallery__img"
            >
          </picture>
        </div>
      </transition-group>

    </div>
    <ModalImage
      :array-src-images = "images"
      :index-image-active = "indexImageActive"
      :is-active-modal = "isActiveModal"
      @modalClose = "isActiveModal = $event"
      @newIndex = "indexImageActive = $event"
    />
  </div>
</template>

<script>
const ARRAY_LENGTH_GALLERY_FOOD = 33
const ARRAY_LENGTH_GALLERY_ROOM = 24
const ARRAY_LENGTH_GALLERY_SHOW = 20

export default {
  name: "photoGallery",
  async asyncData ({ $axios }) {
    const contentApi = await $axios.$get('/json/content.json')
    return {
      content: contentApi
    }
  },
  data () {
    return {
      isLoadingButtons: false,
      isActiveModal: false,
      indexImageActive: 0,
      images: [],
      showItems: false,
    }
  },
  created() {
    this.getPictures('all', 'server')
  },
  methods: {
    getPictures(typeImg, typeLoading) {
      this.images = []
      if (typeLoading === 'click') {
        this.showItems = false
      }
      if (typeImg === 'show' || typeImg === 'all') {
        this.addedInArray('show', ARRAY_LENGTH_GALLERY_SHOW)
      }
      if (typeImg === 'room' || typeImg === 'all') {
        this.addedInArray('room', ARRAY_LENGTH_GALLERY_ROOM)
      }
      if (typeImg === 'food' || typeImg === 'all') {
        this.addedInArray('food', ARRAY_LENGTH_GALLERY_FOOD)
      }
      this.shuffleArr(this.images)
      if (typeLoading === 'click') {
        setTimeout(() =>{
          this.showItems = true
        }, 100)
      }
    },
    addedInArray(type, length){
      const ARRAY = [...Array(length)]
      ARRAY.forEach((pic, i) => {
        this.images.push({
          src: `/image/gallery-${type}/${i}.jpg`,
          srcAvif: `/image/gallery-${type}/${i}.avif`,
          srcMini: `/image/gallery-${type}/${i}-mini.jpg`,
          srcMiniAvif: `/image/gallery-${type}/${i}-mini.avif`,
          id: type + i
        })
      })
    },
    openModalImage(indexImg) {
      this.indexImageActive = indexImg
      this.isActiveModal = true
    },
    shuffleArr(array) {
      array.forEach((item, i) => {
        const j = Math.floor(Math.random() * (i + 1))
        const itemTemp = item
        array[i] = array[j]
        array[j] = itemTemp
      })
      array.forEach((item, i) =>{
          item.id = i
      })
    }
  },
  mounted() {
    this.$nextTick(()=>{
      this.showItems = true
      this.isLoadingButtons = true
    });
  },
  computed: {
    limit() {
      return ARRAY_LENGTH_GALLERY_FOOD + ARRAY_LENGTH_GALLERY_ROOM + ARRAY_LENGTH_GALLERY_SHOW
    }
  }
}
</script>

<style lang="scss">
:root {
  --min-size-img: 110px;
  --max-size-img: 200px;
}
.photo-gallery {
  margin-top: 0;
  width: 100%;
  height: auto;
  background: linear-gradient( rgba(125, 125, 0, 0.1), rgba(0, 0, 0, 0.2) ), url("/image/background/background-gallery.png");
  background-size: 25%;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  &__wrapper {
    width: calc(100% - 24px);
    margin: 42px 0;
    padding: 0 12px;
    @media screen and (min-width: $width-desktop) {
      width: calc(100% - 60px);
      padding: 0 30px;
    }
  }
  &__title {
    margin-bottom: 26px;
    font-size: 20px;
    letter-spacing: 2px;
    font-weight: 600;
  }
  &__photo-menu {
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    flex-wrap: nowrap;
    margin-bottom: 42px;
  }
  &__buttons {
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
  }
  &__button {
    padding: 12px;
    margin: 6px;
    white-space: nowrap;
    background-color: rgba($white, 0.3);
    border: solid 1px rgba($black, 0.8);
    border-radius: 8px;
    &_active{
      border: solid 1px rgba($brown, 0.8);
      color: $brown;
    }
    &:hover {
      cursor: pointer;
      background-color: rgba($brown, 0.1);
    }
    &:active {
      background-color: rgba($brown, 0.3);
      opacity: 1;
      -webkit-animation: flash 1.5s;
      animation: flash 1.5s;
    }
  }

  &__pictures {
    width: 100%;
    display: grid;
    grid-auto-flow: dense;
    grid-gap: 6px;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    grid-auto-rows: minmax(var(--min-size-img), auto);
    @media screen and (min-width: $width-mobile) {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      grid-auto-rows: minmax(var(--max-size-img), auto);
      grid-gap: 18px;
    }
  }
  &__picture {
    border-radius: 6px;
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
    height: var(--min-size-img);
    @media screen and (min-width: $width-mobile) {
      height: var(--max-size-img);
    }
  }
}
.slide-in {

  &-move {
    transition: opacity .5s linear, transform .5s ease-in-out;
  }

  &-leave-active {
    transition: opacity 0.1s linear, transform 0.1s cubic-bezier(.5,0,.7,.4); //cubic-bezier(.7,0,.7,1);
    //transition-delay: calc( 0s * (var(--total) - var(--i)) );
  }

  &-enter-active {
    transition: opacity .5s linear, transform .5s cubic-bezier(.2,.5,.1,1);
    transition-delay: calc( 0.1s * var(--i) );
  }

  &-enter,
  &-leave-to {
    opacity: 0;
  }

  &-enter { transform: translateX(-1em); }
  &-leave-to { transform: translateX(1em); }

}
</style>
