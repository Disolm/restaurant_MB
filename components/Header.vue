<template>
  <div class="header">
    <div class="header__contacts">
      <a
        :href="addressUrl"
        target="_blank"
        class="header__link header__link-address"
      >
        <div class="header__contact header__address-full">
          <div class="header__contact_site">
            {{ site }}
          </div>
          <div class="header__contact_address">
            {{ address }}
          </div>
        </div>
      </a>
      <nuxt-link
        class="header__link header__link-name"
        to="/"
      >
        <div class="header__contact header__contacts_name">
          {{ name }}
        </div>
      </nuxt-link>
      <a
        :href="phoneHref"
        class="header__link header__link-phone"
      >
        <div class="header__contact header__contacts_phone">
          {{ phone }}
        </div>
      </a>
    </div>
    <Navbar />
  </div>
</template>

<script>
import content from 'static/json/content'
import Navbar from '@/components/Navbar'
export default {
  name: 'Header',
  Components: { Navbar },
  data () {
    return {
      address: content.header.address,
      phone: content.header.phone,
      phoneHref: content.header.phoneHref,
      addressUrl: content.header.addressURL2gis
    }
  },
  computed: {
    name () {
      return content.header.name.toUpperCase()
    },
    site () {
      return `${content.header.site} `
    }
  }
}
</script>

<style lang="scss">
.header{
  width: 100%;
  background: rgba($black, 0.7);
  &__contacts {
    height: $height-header-desktop;
    display: grid;
    align-content: center;
    justify-items: center;
    align-items: center;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    @media screen and (min-width: $width-mobile) {
      height: $height-header-mobile;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: 1fr;
    }
  }
  &__link-address {
    margin-left: auto;
    grid-area: 2 / 1 / 3 / 2;
    @media screen and (min-width: $width-mobile) {
      grid-area: 1 / 1 / 2 / 2;
    }
  }
  &__link-name {
    grid-area: 1 / 1 / 2 / 3;
    @media screen and (min-width: $width-mobile) {
      grid-area: 1 / 2 / 2 / 3;
    }
  }
  &__link-phone {
    margin-right: auto;
    grid-area: 2 / 2 / 3 / 3;
    @media screen and (min-width: $width-mobile) {
      grid-area: 1 / 3 / 2 / 4;
    }
  }
  &__contacts_name {
    font-weight: bold;
    font-size: 18px;
    letter-spacing: 0.4rem;
    border-bottom: 2px solid rgba(39, 39, 39, 0) !important;
    margin: 0 !important;
  }
  &__link {
    text-decoration: none;
    color: #dadada;
  }
  &__contact {
    white-space: nowrap;
    margin: 4px;
    border-bottom: 2px solid rgba(201, 242, 242, 0);
    &_site, &_address {
      margin-left: 4px;
      color: inherit;
    }
  }
  &__contact:hover {
    color: $brown;
    border-bottom: 2px solid $brown !important;
    cursor: pointer;
  }
  &__address-full {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
}
</style>
