<template>
  <div
    class="decor"
  >
    <div
      class="decor__wrapper"
      :style="turn"
    >
      <div
        class="decor__pattern"
        :style="backgroundDecor"
      />
      <div class="decor__band"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Decor',
  props: {
    decorUrl: {
      type: String,
      required: false,
      default () {
        return ''
      }
    },
    positionX: {
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
        background: `url("${this.decorUrl}") center ${this.positionX} / auto 22px repeat-x`,
      }
    }
  },
  computed: {
    turn () {
      return {
        display: 'flex',
        'flex-direction': this.positionX === 'top' ? 'column-reverse' : 'column'
      }
    }
  }
}
</script>

<style lang="scss">
.decor {
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
