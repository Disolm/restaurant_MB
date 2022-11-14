<template>
  <div
    class="yandex-map"
  >
    <div
      class="yandex-map__iframe-container"
    >
      <a
        href="https://yandex.ru/maps/org/megobari/198770147175/"
        style="color: #c2c2c2; font-size: 12px; position: absolute; top: 0;"
      >
        Megobari
      </a>
      <a
        href="https://yandex.ru/maps/65/novosibirsk/category/cafe/184106390/"
        style="color: #c2c2c2; font-size: 12px; position: absolute; top:14px;"
      >
        Кафе в Новосибирске
      </a>
      <a
        href="https://yandex.ru/maps/65/novosibirsk/category/banquet_hall/184108315/"
        style="color: #c2c2c2; font-size: 12px; position: absolute; top: 28px;"
      >
        Банкетный зал в Новосибирске
      </a>
      <iframe
        ref="iframeYandexMap"
        class="yandex-map__iframe"
        src="https://yandex.ru/map-widget/v1/-/CCUVeXU4~A"
        style="position:relative;"
        height="100%"
        width="100%"
      />
      <p style="margin: 20%; z-index: -1; padding: 22px; background-color: #A67145; border-radius: 22px">
        Browser blocked Yandex map
      </p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MapIframe',
  data () {
    return {}
  },
}
</script>

<style lang="scss">
.yandex-map {
  display: flex;
  flex-direction: column;
  margin: 22px auto;
  width: 90%;
  height: calc(90vw / 4 * 3);
  @media screen and (min-width: $width-mobile) {
    width: 80%;
    height: calc(80vw / 4 * 3);
  }
  @media screen and (min-width: $width-tablet) {
    width: 60%;
    height: calc(60vw / 4 * 3);
  }
  @media screen and (min-width: $width-desktop) {
    width: 50%;
    height: calc(50vw / 4 * 3);
  }
  &__iframe-container {
    flex: 1;
    position: relative;
    overflow: hidden;
    background: url("/image/foto/index/yandex-map.jpg");
  }
}
</style>
