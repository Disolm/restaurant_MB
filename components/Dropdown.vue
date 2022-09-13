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
      :style="positionSelects()"
      class="dropdown__buttons dropdown__buttons_select"
    >
      <div
        v-for="button in buttons"
        :key="button.id"
        :style="styleOption()"
        class="dropdown__button dropdown__button_option"
      >
        <nuxt-link
          class="dropdown__link"
          :to="button.page"
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
  },
  data () {
    return {
      isOpen: false
    }
  },
  methods: {
    closeDropdown () {
      this.isOpen = false
    },
    positionSelects () {
      return {
        top: `${this.$parent.$refs.buttonsNavbar.clientHeight +
          this.$parent.$refs.buttonsNavbar.offsetTop}px`,
        right: `${(document.documentElement.clientWidth -
          this.$parent.$refs.buttonsNavbar.clientWidth) / 2}px`,
      }
    },
    styleOption () {
      return {
        height: `${this.$parent.$refs.dropdownMenu.$el.offsetHeight}px`
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
      color: #A67145;
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
  }
  &__img {
    width: 50px;
    height: 30px;
  }
  &__img:hover {
    border-bottom: 3px solid #E1F9F9;
    cursor: pointer;
    opacity: 70%;
  }
}
</style>
