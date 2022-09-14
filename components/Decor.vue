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
  /**
   * Лучше избегать названий компонента в одно слово здесь и в остальных местах, кроме папок лэйаут и пейджес
   */
  name: 'Decor',
  props: {
    /**
     ** А зачем это пропсом. если везде при использовании этого компннента передаётся одно и то же значение и не меняется?
     */
    decorUrl: {
      type: String,
      required: false,
      default () {
        return ''
      }
    },
    /**
     * А почему у позиции по оси X значение top? Обычно X - это горизонтальная ось же.
     * Ну и вообще, судя по неймингу здесь как будто ожидается координата :)
     * Также, если у тебя пропс принимает только определенные значение, то хорошо бы сразу валидатор к нему написать,
     * чтобы пользователю компонента было ясно
     */
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
