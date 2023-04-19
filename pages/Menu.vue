<template>
  <div
    class="menu"
    :style="{background: `url('${content.menu.backgroundUrl}'), rgba(243, 237, 225, 1)`}"
  >
    <DecorMenu
      :decor-url="content.menu.decor"
      position-y="top"
    />
    <MenuList
      :background-url="content.menu.backgroundUrl"
      :menu-list="foodMenu"
      :name-file-menu="nameFileMenu"
    />
    <DecorMenu
      :decor-url="content.menu.decor"
      position-y="bottom"
    />
  </div>
</template>

<script>
import contentJson from 'static/json/content'
import MenuList from '@/components/MenuList'
import DecorMenu from '@/components/DecorMenu'

export default {
  name: 'Menu',
  Components: { MenuList, DecorMenu },
  async asyncData ({ $axios }) {
    const NAME_FILE_MENU = 'menu-list'
    const MENU_API = await $axios.$get('/json/' + NAME_FILE_MENU + '.json')
    return {
      foodMenu: MENU_API,
      nameFileMenu: NAME_FILE_MENU
    }
  },
  data () {
    return {
      content: contentJson,
    }
  }
}
</script>

<style lang="scss">
.menu {
  margin-top: 0;
}
</style>
