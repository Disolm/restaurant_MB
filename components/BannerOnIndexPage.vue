<template>
  <div class="banner-on-index-page">
    <transition name="fade">
      <div
        v-if="isShowBanner"
        :key="content.id"
        class="banner-on-index-page__wrapper"
      >
        <div
          :style="{backgroundImage: `url(${this.content.srcImg}`, backgroundPosition: '40% 50%', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}"
          class="banner-on-index-page__image-block"
        >
          <div class="banner-on-index-page__header">{{content.header}}</div>
        </div>
        <div class="banner-on-index-page__text-block">
          <div
            v-if="content.annotation"
            class="banner-on-index-page__annotation"
          >
            {{content.annotation}}
          </div>
          <div
            v-if="content.eventTime"
            class="banner-on-index-page__eventTime"
          >
            {{content.eventTime}}
          </div>
          <div
            v-if="content.foreword"
            class="banner-on-index-page__foreword"
          >
            {{content.foreword}}
          </div>
          <ul class="banner-on-index-page__descriptions">
            <li
              v-for="description in content.descriptions"
              :key="description"
              class="banner-on-index-page__description">
              {{description}}
            </li>
          </ul>
          <div
            v-if="content.bonus"
            class="banner-on-index-page__bonus"
          >
            {{content.bonus}}
          </div>
          <div
            v-if="content.footer"
            class="banner-on-index-page__bonus"
          >
            {{content.footer}}: {{content.phone}}, {{content.address}}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "BannerOnIndexPage",
  data () {
    return {
      content: {
        dateOff: {
          day: 8,
          month: 12,
          yearFull: 2022
        },
        id: 'content',
        header: 'МЕГОБАРИ 3 ГОДА',
        annotation: '8 декабря отмечаем трёхлетие Megobari!',
        eventTime: 'Сбор гостей с 18:00 до 19:00',
        foreword: 'В праздничной программе:',
        descriptions: [
          'Грузинские угощения в виде фуршета',
          'Праздничный торт',
          'Грузинская шоу-программа с танцами, живой музыкой от певицы Марии и певца из Грузии Георгия, мастер-класс по лезгинке',
          'Дискотека',
          'Розыгрыш двух сертификатов в наш ресторан на сумму 2000 и 1000 рублей и сертификат на сумму 1000 рублей в «Кинза Маркет»',
          'Праздничное оформление',
          'Фотограф'
        ],
        bonus: 'Скидка всем гостям ресторана в этот день - 5%!',
        footer: 'Бронируйте столик уже сейчас',
        phone: '311-04-24',
        address: ' Романова 39 ',
        srcImg: '/image/foto/index/banner.jpg'
      },
      isShow: false,
    }
  },
  computed: {
    isShowBanner() {
      const dateNow = new Date()
      const dateOff = new Date(this.content.dateOff.yearFull, this.content.dateOff.month - 1, this.content.dateOff.day +1)
      return dateOff > dateNow
    }
  }

}
</script>

<style lang="scss">
.banner-on-index-page {
  width: 100%;
  &__wrapper {
    padding: 12px;
    background-color: rgba($brown, 0.5);
    display: grid;
    grid-column-gap: 40px;
    grid-row-gap: 10px;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, auto);
    @media screen and (min-width: $width-tablet) {
      padding: 22px;
    }
    @media screen and (min-width: $width-desktop) {
      padding: 42px;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: 1fr;
    }

  }
  &__image-block {
    grid-area: 1 / 1 / 2 / 2;
    @media screen and (min-width: $width-desktop) {
      grid-area: 1 / 1 / 3 / 2;
    }
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    border-radius: 16px;
    min-height: 400px;
  }
  &__header {
    font-size: 32px;
    color: $white;
    background-color: rgba($brown, .4);
    padding: 16px 32px;
    border-radius: 8px;
    margin-bottom: 8px;
    text-align: center;

  }
  &__text-block {
    color: $white;
    font-size: 14px;
    grid-area: 2 / 1 / 3 / 2;
    @media screen and (min-width: $width-desktop) {
      grid-area: 1 / 2 / 3 / 3;
      font-size: 18px;
    }
  }
  &__annotation {
    margin: 16px 0;
    font-weight: revert;
  }
  &__eventTime {
    margin-bottom: 16px;
    font-weight: lighter;
  }
}
</style>
