<template>
  <div class="photo-gallery">
    <div class="photo-gallery__wrapper">
      <transition name="slide-fade">
          <div
            v-if="isLoading"
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
                @click="getPictures(btn.type)"
              >
                {{btn.title}}
              </div>
            </div>
          </div>
      </transition>
      <div class="photo-gallery__pictures" key="pictures">
        <div
          v-for="picture in images"
          :key="picture.id"
          @click="openModalImage(picture.id)"
          class="photo-gallery__picture"
          :style="{backgroundImage: `url(${picture.src}`, backgroundPosition: '50% 30%', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}"
        />
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
</template>

<script>
const ARRAY_LENGTH_GALLERY_FOOD = 33
const ARRAY_LENGTH_GALLERY_ROOM = 24
const ARRAY_LENGTH_GALLERY_SHOW = 10

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
      isLoading: false,
      isActiveModal: false,
      indexImageActive: 0,
      images: [],
    }
  },
  created() {
    this.getPictures('all')
  },
  methods: {
    getPictures(type) {
      this.images = []
      if (type === 'show' || type === 'all') {
        this.addedInArray('show', ARRAY_LENGTH_GALLERY_SHOW)
      }
      if (type === 'room' || type === 'all') {
        this.addedInArray('room', ARRAY_LENGTH_GALLERY_ROOM)
      }
      if (type === 'food' || type === 'all') {
        this.addedInArray('food', ARRAY_LENGTH_GALLERY_FOOD)
      }
      this.shuffleArr(this.images)
    },
    addedInArray(type, length){
      const ARRAY = [...Array(length)]
      ARRAY.forEach((pic, i) => {
        this.images.push({
          src: `/image/gallery-${type}/${i}.jpg`,
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
    this.isLoading = true
  },

}
</script>

<style lang="scss">
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
  }
  &__button:hover {
    cursor: pointer;
    background-color: rgba($brown, 0.1);
  }
  &__button:active {
    background-color: rgba($brown, 0.3);
    opacity: 1;
    -webkit-animation: flash 1.5s;
    animation: flash 1.5s;
  }
  &__pictures {
    width: 100%;
    display: grid;
    grid-auto-flow: dense;
    grid-gap: 6px;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    grid-auto-rows: minmax(90px, auto);
    @media screen and (min-width: $width-mobile) {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      grid-auto-rows: minmax(150px, auto);
      grid-gap: 18px;
    }
  }
  &__picture {
    max-width: 100%;
    border-radius: 6px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    -webkit-filter: sepia(0);
    filter: sepia(0);
    -webkit-transition: .3s ease-in-out;
    transition: .3s ease-in-out;
  }
  &__picture:hover {
    cursor: pointer;
    -webkit-filter: sepia(100%);
    filter: sepia(100%);
  }
}
</style>
