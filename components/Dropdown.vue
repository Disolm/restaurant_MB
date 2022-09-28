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
      :style="{'top': positionDropDown.top, 'right': positionDropDown.right}"
      class="dropdown__buttons dropdown__buttons_select"
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
    widthChanged: {
      type: Number,
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
    },
    widthChanged () {
      this.positionSelects()
    }
  },
  mounted () {
    this.positionSelects()
  },
  methods: {
    positionSelects () {
      let topPosition = 0
      let rightPosition = 0
      const offsetTop = this.$parent.$refs.buttonsNavbar?.offsetTop || 0
      const clientHeight = this.$parent.$refs.buttonsNavbar?.clientHeight || 0
      const clientWidth = this.$parent.$refs.buttonsNavbar?.clientWidth || 0
      if (offsetTop) {
        topPosition = clientHeight + offsetTop
        rightPosition = (document.documentElement.clientWidth - clientWidth) / 2
      } else {
        topPosition = clientHeight
        rightPosition = 0
      }
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
    width: 170px;
    &_select {
      position: absolute;
      display: flex;
      flex-direction: column;
      z-index: 10;
    }
  }
  &__button {
    display: block;
    &_option {
      background-color: rgba($black, calc($opacity-header-and-footer + 0.1));
      box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }
    &_option:hover {
      color: $brown;
      cursor: pointer;
    }
    &_indent {
      padding: 0 20px;
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
    opacity: 60%;
  }
}
</style>
