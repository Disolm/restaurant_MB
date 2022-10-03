<template>
  <div
    :style="{background: `url('${content.barMap.backgroundUrl}')`}"
    class="map-bar"
  >
    <DecorMenu
      :decor-url="content.barMap.decor"
      position-y="top"
    />
    <MenuList
      :background-url="content.barMap.backgroundUrl"
      :menu-list="beverages"
    />
    <DecorMenu
      :decor-url="content.barMap.decor"
      position-y="bottom"
    />
  </div>
</template>

<script>
import contentJson from 'static/json/content'
import MenuList from '@/components/MenuList'
import DecorMenu from '@/components/DecorMenu'

export default {
  name: 'MapBar',
  Components: { MenuList, DecorMenu },
  async asyncData ({ $axios }) {
    const mapBarApi = await $axios.$get('/json/mapBar.json')
    return {
      beverages: mapBarApi
    }
  },
  data () {
    return {
      content: contentJson,
    }
  },
}
</script>

<style lang="scss">
.map-bar {
}
</style>
