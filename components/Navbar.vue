<template>
  <div class="navbar">
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
          class="navbar__link"
          :to="button.page"
        >
          <div class="navbar__button navbar__button_indent">
            {{ button.name }}
          </div>
        </nuxt-link>
      </div>
      <Dropdown
        v-if="isShowDropdownMenu"
        ref="dropdownMenu"
        class="navbar__dropdown"
        :buttons="buttonsDataDropdown"
      />
    </div>
    <div
      class="navbar__pageup"
      @click="pageup">
      в верх
    </div>
  </div>
</template>

<script>
import buttonsData from 'static/json/buttoms-menu'
const RESERVE = 2
export default {
  name: 'Navbar',
  data () {
    return {
      widthNavbar: 0,
      buttonsDataNavbar: [],
      buttonsDataDropdown: [],
      widthButtons: [],
      isShowDropdownMenu: true,
    }
  },
  mounted () {
    this.addButtonsInArrForNavbar()
    this.$nextTick(() => {
      this.capacityCheck()
      window.addEventListener('resize', this.capacityCheck)
      // window.addEventListener('scroll', this.addButtonPageUp)
    })
  },
  methods: {
    addButtonsInArrForNavbar () {
      this.buttonsDataNavbar = [...buttonsData]
      this.buttonsDataDropdown = []
    },
    capacityCheck () {
      this.addButtonsInArrForNavbar()
      this.widthNavbar = this.$refs.buttonsNavbar?.offsetWidth || 0
      if (!this.widthNavbar) {
        return
      }
      let sumWidthButtons = RESERVE + Math.ceil(this.$refs.dropdownMenu?.$el.clientWidth) || 0
      this.buttonsDataNavbar.forEach((button, i) => {
        if (this.$refs.setButtonsRef[i]) {
          this.widthButtons[i] = this.$refs.setButtonsRef[i].offsetWidth
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
    pageup () {
      window.scrollTo(0, 0)
    }
  },
}
</script>

<style lang="scss">
.navbar {
  height: 52px;
  margin: 0 auto;
  background-color: #E1F9F9;
  &__buttons {
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: nowrap;
    align-items: center;
  }
  &__button {
    height: 100%;
    white-space: nowrap;
    &_indent {
      padding: 8px 18px;
      //color: #A67145;
    }
    &_indent:hover {
      color: #A67145;
      border-bottom: 2px solid #A67145;
      cursor: pointer;
    }
  }
  &__dropdown:hover {
    //border-bottom: 3px solid #E1F9F9;
    //cursor: pointer;
  }
  &__link {
    text-decoration: none;
  }
  &__pageup {
    position: fixed;
    right: 50px;
    bottom: 100px;
    z-index: 50;
  }
}
</style>
