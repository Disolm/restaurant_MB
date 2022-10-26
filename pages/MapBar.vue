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
      :name-file-menu="nameFileMenu"
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
    const NAME_FILE_MENU = 'mapBar'
    const MAP_BAR_API = await $axios.$get('/json/' + NAME_FILE_MENU + '.json')
    return {
      beverages: MAP_BAR_API,
      nameFileMenu: NAME_FILE_MENU
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
  margin-top: 0;
}
</style>
