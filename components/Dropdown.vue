<template>
  <div class="dropdown">
    <div
      v-click-outside="closeDropdown"
      class="dropdown__button dropdown__button_indent"
      @click="isOpen = !isOpen"
    >
      <img
        class="dropdown__img"
        src="/image/icons8-меню-384.svg"
        alt=""
      >
    </div>
    <div
      v-if="isOpen"
      :style="{'top': positionDropDown.top, 'right': positionDropDown.right}"
      class="dropdown__buttons dropdown__buttons_select"
    >
      <div
        v-for="button in buttons"
        :key="button.id"
        class="dropdown__button dropdown__button_option"
      >
        <nuxt-link
          class="dropdown__link"
          :to="button.page"
          exact-active-class="dropdown__link_active-page"
        >
          <div class="dropdown__name-button">
            {{ button.name }}
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'
export default {
  name: 'Dropdown',
  directives: {
    ClickOutside
  },
  props: {
    buttons: {
      type: Array,
      required: true,
      default () {
        return []
      }
    },
    scrollDown: {
      type: Boolean,
      required: true,
    }
  },
  data () {
    return {
      isOpen: false,
      positionDropDown: {
        top: 0,
        right: 0
      }
    }
  },
  watch: {
    scrollDown () {
      this.positionSelects()
    }
  },
  mounted () {
    this.positionSelects()
  },
  methods: {
    closeDropdown () {
      this.isOpen = false
    },
    positionSelects () {
      let topPosition = 0
      let rightPosition = 0
      const offsetTop = this.$parent.$refs.buttonsNavbar.offsetTop
      const clientHeight = this.$parent.$refs.buttonsNavbar.clientHeight
      const clientWidth = this.$parent.$refs.buttonsNavbar.clientWidth
      if (offsetTop) {
        topPosition = clientHeight + offsetTop
      } else {
        topPosition = clientHeight
      }
      rightPosition = (document.documentElement.clientWidth - clientWidth) / 2
      this.positionDropDown = {
        top: `${topPosition}px`,
        right: `${rightPosition}px`,
      }
    }
  }
}
</script>

<style lang="scss">
.dropdown{
  &__buttons {
    &_select {
      position: absolute;
      display: inline-flex;
      flex-direction: column;
      z-index: 10;
      height: $height-header-desktop;
      @media screen and (min-width: $width-mobile) {
        height: $height-header-mobile;
      }
    }
  }
  &__button {
    display: inline-block;
    &_option {
      background-color: #E1F9F9;
      width: 160px;
      box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }
    &_option:hover {
      color: $brown;
      background-color: white;
      cursor: pointer;
    }
    &_indent {
      padding: 0 20px;
    }
  }
  &__name-button {
    margin: 5% 0;
    text-align: center;
  }
  &__link {
    text-decoration: none;
    color: $black;
    &_active-page {
      width: 100%;
      height: 100%;
      color: $brown !important;
      background-color: white !important;
    }
  }
  &__img {
    width: 50px;
    height: 30px;
    filter: invert(100%);
  }
  &__img:hover {
    //border-bottom: 3px solid #E1F9F9;
    cursor: pointer;
    opacity: 60%;
  }
}
</style>
