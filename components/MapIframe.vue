<template>
  <div
    id="map"
    class="map"
  >
    <div class="dg-widget-link map__dg-widget-link">
      <a class="map__link"
         href="http://2gis.ru/novosibirsk/firm/70000001040265022/center/82.92195081710817,55.03554840462446/zoom/16?utm_medium=widget-source&utm_campaign=firmsonmap&utm_source=bigMap">
        Посмотреть на карте Новосибирска
      </a>
    </div>
    <div class="dg-widget-link map__dg-widget-link">
      <a class="map__link"
         href="http://2gis.ru/novosibirsk/firm/70000001040265022/photos/70000001040265022/center/82.92195081710817,55.03554840462446/zoom/17?utm_medium=widget-source&utm_campaign=firmsonmap&utm_source=photos">
        Фотографии компании
      </a>
    </div>
    <div class="dg-widget-link map__dg-widget-link">
      <a class="map__link"
         href="http://2gis.ru/novosibirsk/center/82.922458,55.035128/zoom/16/routeTab/rsType/bus/to/82.922458,55.035128╎Megobari, ресторан-кафе?utm_medium=widget-source&utm_campaign=firmsonmap&utm_source=route">
        Найти проезд до Sa'MegoBro, ресторан-кафе
      </a>
    </div>
    <br>
    <!--      <script charset="utf-8" src="https://widgets.2gis.com/js/DGWidgetLoader.js"></script>-->
    <iframe frameborder="no" style="border: 1px solid #a3a3a3; box-sizing: border-box;" width="100%" height="100%"
            src="https://widgets.2gis.com/widget?type=firmsonmap&options=%7B%22pos%22%3A%7B%22lat%22%3A55.03554840462446%2C%22lon%22%3A82.92195081710817%2C%22zoom%22%3A16%7D%2C%22opt%22%3A%7B%22city%22%3A%22novosibirsk%22%7D%2C%22org%22%3A%2270000001040265022%22%7D">
    </iframe>
  </div>
</template>

<script>

export default {
  name: 'MapIframe',
}
</script>

<style lang="scss">
.map {
  --pading: 16px;
  display: flex;
  flex-direction: column;
  margin: 22px auto;
  padding: var(--pading);
  border: 2px solid rgba($brown, .4);
  border-radius: 8px;
  background: rgba($turquoise, .1);
  width: calc(95% - var(--pading));
  height: calc(95vw / 4 * 3);
  @media screen and (min-width: $width-mobile) {
    width: calc(85% - var(--pading));
    height: calc(85vw / 4 * 3);
  }
  @media screen and (min-width: $width-tablet) {
    width: 80%;
    height: calc(80vw / 4 * 3);
  }
  @media screen and (min-width: $width-desktop) {
    width: 60%;
    height: calc(60vw / 4 * 3);
  }
  &__dg-widget-link {
    margin-bottom: .2rem;
  }
  &__link {
    text-decoration: none;
    color: $brown;
    &:hover {
      color: $red;
    }
    &:active {
      color: rgba($red, .5);
    }
  }
}
</style>
