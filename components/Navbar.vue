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
      v-if="isShowPageup"
      class="navbar__pageup"
      :style="positionPageup"
      @click="pageup">
      <img src="/image/pageup.svg" alt="Вверх" title="Вверх">
    </div>
  </div>
</template>

<script>
import buttonsData from 'static/json/buttoms-menu'
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
      positionPageup: {
        bottom: 0,
        right: 0
      }
    }
  },
  mounted () {
    this.addButtonsInArrForNavbar()
    this.$nextTick(() => {
      this.capacityCheck()
      this.calcPositionPageup()
      /**
       * Если навешиваешь слушатели, то нужно от них отписываться при дестрое компонента,
       * потому что сами они никуда не денутся при переходе на другую страницу, например
       */
      window.addEventListener('resize', this.capacityCheck)
      window.addEventListener('scroll', this.addButtonPageUp)
    })
  },
  methods: {
    addButtonsInArrForNavbar () {
      this.buttonsDataNavbar = [...buttonsData]
      this.buttonsDataDropdown = []
    },
    /**
     * checkCapacity
     */
    capacityCheck () {
      this.addButtonsInArrForNavbar()
      this.calcPositionPageup()
      this.widthNavbar = this.$refs.buttonsNavbar?.offsetWidth || 0
      if (!this.widthNavbar) {
        return
      }
      let sumWidthButtons = RESERVE_MARGIN + Math.ceil(this.$refs.dropdownMenu?.$el.clientWidth) || 0
      this.buttonsDataNavbar.forEach((button, i) => {
        if (this.$refs.setButtonsRef[i]) {
          this.widthButtons[i] = this.$refs.setButtonsRef[i].offsetWidth
        }
        sumWidthButtons += this.widthButtons[i]
      })

      /**
       * Я бы не использовал for(...) из-за избыточности. Тем более строчкой выше ты спокойно использовал forEach
       */
      for (let i = this.buttonsDataNavbar.length - 1; i > 0; i--) {
        if (this.widthNavbar < sumWidthButtons) {
          sumWidthButtons -= this.widthButtons[i]
          this.buttonsDataDropdown.unshift(this.buttonsDataNavbar[i])
          this.buttonsDataNavbar.pop()
        }
      }
      this.isShowDropdownMenu = !!this.buttonsDataDropdown.length
    },
    calcPositionPageup () {
      this.positionPageup.bottom = '80px'
      this.positionPageup.right = `${(window.innerWidth - this.$refs.buttonsNavbar.offsetWidth) / 2 + 40}px`
    },
    addButtonPageUp () {
      this.calcPositionPageup()
      const HEIGHT = this.$refs.buttonsNavbar.offsetHeight + this.$refs.buttonsNavbar.offsetTop
      this.isShowPageup = HEIGHT < window.scrollY
    },
    pageup () {
      window.scrollTo(0, 0)
    },
  }
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
      padding: 6px 18px;
    }
    &_indent:hover {
      color: #A67145;
      border-bottom: 2px solid #A67145;
      cursor: pointer;
    }
  }
  &__link {
    text-decoration: none;
  }
  &__pageup {
    position: fixed;
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
}
</style>
