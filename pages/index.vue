<template>
  <div class="index">
    <div class="index__wrapper">
      <h1 class="index__title">
        {{ descriptionText }}
      </h1>
    </div>
  </div>
</template>

<script>
import content from 'static/json/content'

export default {
  name: 'Index',
  data () {
    return {
      descriptionText: content.index.description
    }
  },
}
</script>
<style lang="scss">
.index {
  height: 100%;
  &__wrapper {
    position: relative;
    height: calc(100vh - 92px);
    padding: 30px 50px;
    background: url("static/image/foto/index/photo_5303202403811704257_y.jpg") no-repeat 50%;
    background-size: cover;
  }
  &__title {
    max-width: 700px;
    color: #fff;
    font-size: 20px;
    font-weight: 400;
    line-height: 52px;
  }
}
</style>
