<template>
  <div class="dropdown">
    <div
      class="dropdown__button dropdown__button_indent"
      @click="isOpen = !isOpen"
    >
      <img
        v-if="isOpen"
        class="dropdown__img"
        src="/image/menu-off.svg"
        alt=""
      >
      <img
        v-else
        class="dropdown__img"
        src="/image/menu-on.svg"
        alt=""
      >
    </div>
    <div
      v-if="isOpen"
      :class="{'dropdown__buttons_position-default': !scrollDown, 'dropdown__buttons_position-scroll': scrollDown}"
      class="dropdown__buttons"
    >
      <nuxt-link
        v-for="button in buttons"
        :key="button.id"
        class="dropdown__link dropdown__button dropdown__button_option"
        :to="button.page"
        exact-active-class="dropdown__link_active-page"
        @click.native="isOpen = false"
      >
        {{ button.name }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
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
    },
  },
  data () {
    return {
      isOpen: false,
    }
  },
}
</script>

<style lang="scss">
.dropdown{
  &__buttons {
    width: 170px;
    display: flex;
    flex-direction: column-reverse;
    z-index: 10;
    &_position-default {
      position: absolute;
      right: 0;
      top: $height-header-mobile;
      @media screen and (min-width: $width-mobile) {
        top: $height-header-desktop;
      }
    }
    &_position-scroll {
      position: fixed;
      right: 0;
      top: $height-header-navbar-mobile;
      @media screen and (min-width: $width-mobile) {
        top: $height-header-navbar-desktop;
      }
    }
  }
  &__button {
    display: block;
    &_option {
      background-color: rgba($black, calc($opacity-header-and-footer));
      box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }
    &_option:hover {
      color: $brown;
      cursor: pointer;
    }
    &_indent {
      padding-right: 20px;
    }
  }
  &__link {
    color: $white;
    padding: 8px 18px;
    &_active-page {
      color: $brown !important;
    }
  }
  &__link:hover {
    color: $brown;
  }
  &__img {
    width: 50px;
    height: 30px;
    filter: invert(100%);
  }
  &__img:hover {
    cursor: pointer;
    opacity: 0.6;
  }
}
</style>
