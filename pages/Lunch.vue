<template>
  <div
    class="lunch"
    :style="{background: `url('${content.lunch.backgroundUrl}'), rgba(246, 246, 235, 1)`}"
  >
    <DecorMenu
      :decor-url="content.lunch.decor"
      position-y="top"
    />
    <MenuList
      :background-url="content.lunch.backgroundUrl"
      :menu-list="lunchMenu"
      :name-file-menu="nameFileMenu"
    />
    <DecorMenu
      :decor-url="content.lunch.decor"
      position-y="bottom"
    />
  </div>
</template>

<script>
import contentJson from 'static/json/content'
import MenuList from '@/components/MenuList'
import DecorMenu from '@/components/DecorMenu'

export default {
  name: 'Lunch',
  Components: { MenuList, DecorMenu },
  async asyncData ({ $axios }) {
    const NAME_FILE_MENU = 'lunch-list'
    const LUNCH_API = await $axios.$get('/json/' + NAME_FILE_MENU + '.json')
    return {
      lunchMenu: LUNCH_API,
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
.lunch {
  margin-top: 0;
}
</style>
