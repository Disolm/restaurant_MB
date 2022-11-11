<template>
  <div class="modal-image">
    <div
      class="modal-image__overlay"
      :class="classActiveModalOverlay"
    >
      <div
        class="modal-image__window"
        :class="classActiveModalWindow"
      >
        <div
          @click="changeActiveIndexImg('back')"
          class="modal-image__back"
        >
          <img src="/image/icon/arrow-left.svg" alt="back">
        </div>
        <div class="modal-image__img-wrapper">
          <img
            class="modal-image__img"
            :src="arraySrcImages[indexImageActive].src"
            alt=""
          >
        </div>
        <div
          @click="changeActiveIndexImg('next')"
          class="modal-image__next"
        >
          <img src="/image/icon/arrow-right.svg" alt="next">
        </div>
      </div>
      <div
        class="modal-image__close"
        @click="$emit('modalClose', false)"
      >
        <img src="/image/icon/close.svg" alt="close">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalImage",
  props: {
    isActiveModal: {
      type: Boolean,
      default: false,
      required: true,
    },
    indexImageActive: {
      type: Number,
      default: 0,
      required: true,
    },
    arraySrcImages: {
      type: Array,
      default: [],
      required: true,
    },
  },
  methods: {
    changeActiveIndexImg(way) {
      let tempIndex = this.indexImageActive
      if (way === 'next') {
        tempIndex === this.arraySrcImages.length - 1 ? tempIndex = 0 : tempIndex += 1
      }
      if (way === 'back') {
        tempIndex === 0 ? tempIndex = this.arraySrcImages.length - 1 : tempIndex -= 1
      }
      this.$emit('newIndex', tempIndex)
    }
  },
  computed: {
    classActiveModalOverlay() {
      return {
        activeModalOverlay: this.isActiveModal === true,
        inActiveModalOverlay: this.isActiveModal === false,
      };
    },
    classActiveModalWindow() {
      return {
        activeModalWindow: this.isActiveModal === true,
        inActiveModalWindow: this.isActiveModal === false,
      };
    },
  },
}
</script>

<style lang="scss">
.modal-image {
  &__overlay {
    width: 100%;
    height: 100%;
    margin: auto;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }
  &__window {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  &__img {
    max-width: 100%;
    min-height: 0;
    max-height: 80%;
  }
  &__close {
    //width: 10%;
    //height: 10%;
    position: fixed;
    top: 10px;
    right: 10px;
    border: 1px solid rgba($turquoise, 0);
    border-radius: 4px;
    img {
      filter: invert(100%);
      width: 40px;
      height: 40px;
    }
  }
  &__close:hover {
    cursor: pointer;
    border: 1px solid rgba($turquoise, 0.5);

  }
  &__close:active {
    cursor: pointer;
    border: 1px solid rgba($turquoise, 1);
    img {
      opacity: 1;
      -webkit-animation: flash 1.5s;
      animation: flash 1.5s;
    }
  }
  &__back {
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
  }
  &__next {
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
  }
  &__next, &__back {
    height: 200px;
    width: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  &__next:hover, &__back:hover {
    cursor: pointer;
    //background-color: rgba($white, 0.5);
  }
  &__next:active, &__back:active {
    cursor: pointer;
    background-color: rgba($white, 0.2);
    img {
      opacity: 1;
      -webkit-animation: flash 1.5s;
      animation: flash 1.5s;
    }
  }
}
.activeModalOverlay {
  opacity: 1;
  z-index: 500;
  background: rgba($black, 1);
  transition: background .2s ease-in;
}
.inActiveModalOverlay {
  opacity: 0;
  z-index: -10;
  background: rgba($black, 0);
  transition: all .2s ease-out;
}
.activeModalWindow {
  transform: translateY(0);
  transition: transform .2s ease-in;
}
.inActiveModalWindow {
  transform: translateY(-400px);
  transition: transform .2s ease-out;
}
@-webkit-keyframes flash {
  0% {
    opacity: .4;
  }
  100% {
    opacity: 1;
  }
}
@keyframes flash {
  0% {
    opacity: .4;
  }
  100% {
    opacity: 1;
  }
}
</style>
