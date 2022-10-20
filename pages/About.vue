<template>
  <div class="about">
    <div class="about__map">
      <div class="about__show-map">
        <div
          class="about__button"
          @click="isShowMap = !isShowMap"
        >
          {{ isShowMap ? hideMapText : showMapText }}
        </div>
      </div>
      <div
        v-if="isShowMap"
        style="position:relative;overflow:hidden;"
        class="index__iframe"
      >
        <a href="https://yandex.ru/maps/org/megobari/198770147175/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:0;">
          Megobari
        </a>
        <a href="https://yandex.ru/maps/65/novosibirsk/category/cafe/184106390/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:14px;">
          Кафе в Новосибирске
        </a>
        <a href="https://yandex.ru/maps/65/novosibirsk/category/banquet_hall/184108315/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:28px;">
          Банкетный зал в Новосибирске
        </a>
        <iframe
          src="https://yandex.ru/map-widget/v1/-/CCUVeXU4~A"
          fullscreen="true"
          style="position:relative;"
        />
      </div>
    </div>
  </div>
</template>

<script>
import content from 'static/json/content'

export default {
  name: 'About',
  data () {
    return {
      isShowMap: false,
    }
  },
  computed: {
    showMapText () {
      return content.about.showMap
    },
    hideMapText () {
      return content.about.hideMap
    }
  }
}
</script>

<style lang="scss">
.about {
  margin-top: 0;
  &__button {
    display: inline-block;
    border-bottom: 1px solid #FFF2E7;
  }
  &__button:hover {
    border-bottom: 1px solid $black;
    cursor: pointer;
  }
  &__iframe {
    //max-width: 500px;
    //max-height: 500px;
    iframe {
      max-width: 100% !important;
      width: auto !important;
      height: auto !important;
    }
  }
}
</style>
