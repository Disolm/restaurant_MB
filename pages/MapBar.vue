<template>
  <div
    :style="{background: `url('${urlImg}')`}"
    class="map-bar"
  >
    <Decor
      :decor-url="decor"
      position-x="top"
    />
    <MenuList
      :background-url="urlImg"
      :menu-list="beverages"
    />
    <Decor
      :decor-url="decor"
      position-x="bottom"
    />
  </div>
</template>

<script>
import contentJson from 'static/json/content'
import barJson from 'static/json/mapBar'
import MenuList from '@/components/MenuList'

export default {
  name: 'MapBar',
  Components: { MenuList },
  data () {
    return {
      content: contentJson,
      beverages: barJson,
      urlImg: contentJson.barMap.backgroundUrl,
      decor: contentJson.barMap.decor
    }
  }
}
</script>

<style lang="scss">
.map-bar {
}
</style>
