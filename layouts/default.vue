<template>
  <main>
    <div class="container">
      <TheHeader
        class="container__header"
      />
      <nuxt
        class="container__nuxt"
      />
      <TheFooter
        class="container__footer"
      />
    </div>
  </main>
</template>

<script>
import TheHeader from '@/components/TheHeader'
import TheFooter from '@/components/TheFooter'
import telegram_data from 'static/json/telegram-api.json'

export default {
  name: 'Default',
  Components: {
    TheFooter, TheHeader
  },
  head() {
    return {
      script: [
        {
          // src: 'https://widgets.2gis.com/js/DGWidgetLoader.js'
        },
      ]
    }
  },
  data () {
    return {
    }
  },
  mounted() {
    this.whoIs ()
  },
  methods: {
    async whoIs () {
      const user = navigator
      const sms = user.userAgentData?.platform + ' ' + user.vendor + ' ' + user.userAgent
      const URL = `https://api.telegram.org/bot${telegram_data.token}/sendMessage?chat_id=${telegram_data['id-group-active']}&text=${sms}&parse_mode=html`
      await fetch(URL)
    }
  }
}
</script>
<style lang="scss">
body {
  margin: 0;
}
.size {
  height: 100%;
  width: 100%;
}
#__nuxt, #__layout {
  height: 100%;
}
main {
  height: calc(100% + $height-footer);
}
.container {
  display: flex;
  flex-direction: column;
  min-width: $width-minimal;
  min-height: 100%;
  font-family: Montserrat, Verdana, sans-serif;
  color: $black;
  background-color: $black;
  font-size: 14px;
  @media screen and (min-width: $width-mobile) {
    font-size: 16px;
  }
  a {
    text-decoration: none;
  }
  &__header{
    margin-bottom: calc($height-header-mobile * (-1));
    @media screen and (min-width: $width-mobile) {
      margin-bottom: calc($height-header-desktop * (-1));
    }
    z-index: 5;
  }
  &__nuxt {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    padding-bottom: $height-footer;
    padding-top: $height-header-mobile;
    margin-top:  - $height-header-mobile;
    @media screen and (min-width: $width-mobile) {
      padding-top: $height-header-desktop;
      margin-top: - $height-header-desktop;
    }
  }
  &__footer {
    z-index: 1;
    flex-shrink: 0;
    margin-top: -$height-footer;
  }
}
</style>
