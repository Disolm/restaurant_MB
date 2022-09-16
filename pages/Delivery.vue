<template>
  <div class="delivery">
    <div class="delivery__wrapper">
      <div class="delivery__title">
        {{ content.title }}
      </div>
    </div>
  </div>
</template>

<script>
import contentJson from 'static/json/content'

export default {
  name: 'Delivery',
  data () {
    return {
      content: contentJson.delivery
    }
  }
}
</script>

<style lang="scss">
.delivery {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  position: relative;
  background: url("static/image/foto/delivery/6835f3d7-d6d9-4cfe-a0ad-048654cc81c8.jpg") no-repeat center;
  background-size: cover;
  //&__wrapper {
  //  min-height: 100%;
  //}
}
</style>
