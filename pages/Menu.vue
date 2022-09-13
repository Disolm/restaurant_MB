<template>
  <div
    class="menu"
    :style="{background: `url('${urlImg}')`}"
  >
    <Decor
      :decor-url="decor"
      position-x="top"
    />
    <MenuList
      :background-url="urlImg"
      :menu-list="foodMenu"
    />
    <Decor
      :decor-url="decor"
      position-x="bottom"
    />
  </div>
</template>

<script>
import contentJson from 'static/json/content'
import menuJson from 'static/json/menu'
import MenuList from '@/components/MenuList'
export default {
  name: 'Menu',
  Components: { MenuList },
  data () {
    return {
      content: contentJson,
      foodMenu: menuJson,
      urlImg: contentJson.menu.backgroundUrl,
      decor: contentJson.menu.decor
    }
  }
}
</script>

<style lang="scss">
.menu {
}
</style>
