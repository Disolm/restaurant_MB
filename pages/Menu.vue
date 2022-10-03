<template>
  <div
    class="menu"
    :style="{background: `url('${content.menu.backgroundUrl}')`}"
  >
    <DecorMenu
      :decor-url="content.menu.decor"
      position-y="top"
    />
    <MenuList
      :background-url="content.menu.backgroundUrl"
      :menu-list="foodMenu"
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
    const menuApi = await $axios.$get('/json/menu.json')
    return {
      foodMenu: menuApi
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
}
</style>
