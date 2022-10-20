<template>
  <div
    class="lunch"
    :style="{background: `url('${content.lunch.backgroundUrl}')`}"
  >
    <DecorMenu
      :decor-url="content.lunch.decor"
      position-y="top"
    />
    <MenuList
      :background-url="content.lunch.backgroundUrl"
      :menu-list="lunchMenu"
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
    const lunchApi = await $axios.$get('/json/lunch.json')
    return {
      lunchMenu: lunchApi
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
