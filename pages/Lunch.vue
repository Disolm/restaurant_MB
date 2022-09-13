<template>
  <div
    class="lunch"
    :style="{background: `url('${urlImg}')`}"
  >
    <Decor
      :decor-url="decor"
      position-x="top"
    />
    <MenuList
      :background-url="urlImg"
      :menu-list="lunchMenu"
    />
    <Decor
      :decor-url="decor"
      position-x="bottom"
    />
  </div>
</template>

<script>
import contentJson from 'static/json/content'
import lunchJson from 'static/json/lunch'
import MenuList from '@/components/MenuList'
export default {
  name: 'Lunch',
  Components: { MenuList },
  data () {
    return {
      content: contentJson,
      lunchMenu: lunchJson,
      urlImg: contentJson.lunch.backgroundUrl,
      decor: contentJson.lunch.decor
    }
  }
}
</script>

<style lang="scss">
.lunch {
}
</style>
