<template>
  <div
    class="navbar"
  >
    <div
      v-if="isShowPageup"
      class="navbar__panel navbar__panel_copy"
    />
    <div
      :class="{'navbar__scroll-down': isShowPageup}"
      class="navbar__panel"
    >
      <div
        ref="buttonsNavbar"
        class="navbar__buttons"
      >
        <div
          v-for="button in buttonsDataNavbar"
          ref="setButtonsRef"
          :key="button.id"
          class="navbar__wrapper-button"
        >
          <nuxt-link
            class="navbar__link navbar__link_indent"
            :to="button.page"
            exact-active-class="navbar__link_active-page"
          >
            {{ button.name }}
          </nuxt-link>
        </div>
        <Dropdown
          v-if="isShowDropdownMenu"
          ref="dropdownMenu"
          key="dropdown"
          class="navbar__dropdown"
          :buttons="buttonsDataDropdown"
          :scroll-down="isShowPageup"
          :width-changed="widthChanged"
        />
      </div>
    </div>
    <div
      v-if="isShowPageup"
      class="navbar__pageup"
      @click="pageup(0,0)"
    >
      <img
        src="/image/pageup.svg"
        alt="Вверх"
        title="Вверх"
      >
    </div>
  </div>
</template>

<script>
import buttonsData from 'static/json/buttons-menu-temp'

const RESERVE_MARGIN = 4
export default {
  name: 'Navbar',
  data () {
    return {
      widthNavbar: 0,
      buttonsDataNavbar: [],
      buttonsDataDropdown: [],
      widthButtons: [],
      isShowDropdownMenu: true,
      isShowPageup: false,
      widthChanged: 0
    }
  },
  mounted () {
    // this.getMenuListbuttons()
    this.addButtonsInArrForNavbar()
    this.$nextTick(() => {
      this.capacityCheck()
      window.addEventListener('resize', this.capacityCheck)
      window.addEventListener('scroll', this.addButtonPageUp)
    })
  },
  methods: {
    addButtonsInArrForNavbar () {
      this.buttonsDataNavbar = [...buttonsData]
      this.buttonsDataDropdown = []
    },
    capacityCheck () {
      this.addButtonsInArrForNavbar()
      this.widthChanged = window.innerWidth
      this.widthNavbar = this.$refs.buttonsNavbar?.offsetWidth || 0
      if (!this.widthNavbar) {
        return
      }
      let sumWidthButtons = RESERVE_MARGIN + Math.ceil(this.$refs.dropdownMenu?.$el.clientWidth) || 0
      this.buttonsDataNavbar.forEach((button, i) => {
        if (this.$refs.setButtonsRef[i]) {
          this.widthButtons[i] = this.$refs.setButtonsRef[i]?.offsetWidth || 0
        }
        sumWidthButtons += this.widthButtons[i]
      })
      for (let i = this.buttonsDataNavbar.length - 1; i > 0; i--) {
        if (this.widthNavbar < sumWidthButtons) {
          sumWidthButtons -= this.widthButtons[i]
          this.buttonsDataDropdown.unshift(this.buttonsDataNavbar[i])
          this.buttonsDataNavbar.pop()
        }
      }
      this.isShowDropdownMenu = !!this.buttonsDataDropdown.length
    },

    addButtonPageUp () {
      const HEIGHT = (this.$refs.buttonsNavbar?.offsetHeight || 0)
      this.isShowPageup = HEIGHT < window.scrollY
    },
    pageup (x, y) {
      window.scrollTo(x, y)
    },
  }
}
</script>

<style lang="scss">
.navbar {
  width: 100%;
  height: 100%;
  &__panel {
    height: $height-navbar-mobile;
      @media screen and (min-width: $width-mobile) {
    height: $height-navbar-desktop;
    }
  }
  &__buttons {
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: nowrap;
    align-items: center;
  }
  &__link {
    text-decoration: none;
    height: 100%;
    white-space: nowrap;
    color: $white;
    &_indent {
      padding: 6px 18px;
      border-bottom: 2px solid rgba(255, 255, 255, 0);
    }
    &_indent:hover {
      color: $brown;
      border-bottom: 2px solid $brown;
      cursor: pointer;
    }
    &_active-page {
      color: $brown;
    }
  }
  &__pageup {
    position: fixed;
    bottom: 70px;
    right: 40px;
    z-index: 50;
    img {
      width: 32px;
      height: 32px;
      border-radius: 18px;
      box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
    }
  }
  &__pageup:hover {
    img {
      height: 36px;
    }
  }
  &__scroll-down {
    position: fixed;
    margin: 0 auto;
    top: 0;
    left: 50%;
    width: calc(100% - $main-margin * 2);
    transform: translateX(-50%);
    background-color: rgba($black, 1);
  }
}
</style>
