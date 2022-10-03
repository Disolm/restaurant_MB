<template>
  <div
    class="decor-menu"
  >
    <div
      class="decor-menu__wrapper"
      :style="turn"
    >
      <div
        class="decor-menu__pattern"
        :style="backgroundDecor"
      />
      <div
        class="decor-menu__band"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DecorMenu',
  props: {
    decorUrl: {
      type: String,
      required: false,
      default () {
        return ''
      }
    },
    positionY: {
      type: String,
      required: false,
      default () {
        return 'top'
      }
    },
  },
  data () {
    return {
      backgroundDecor: {
        background: `url("${this.decorUrl}") center ${this.positionY} / auto 22px  space`,
      }
    }
  },
  computed: {
    turn () {
      return {
        display: 'flex',
        'flex-direction': this.positionY === 'top' ? 'column-reverse' : 'column'
      }
    }
  }
}
</script>

<style lang="scss">
.decor-menu {
  width: 100%;
  &__pattern{
    height: 24px
  }
  &__band {
    display: block;
    width: 100%;
    height: 4px;
    background-color: #BFB8B1;
  }
}
</style>
