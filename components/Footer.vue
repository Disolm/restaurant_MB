<template>
  <div class="footer">
    <div class="footer__timetables">
      <div class="footer__timetable footer__timetable_common">
        <div class="footer__timetable">
          {{ schedule('common-text') }}
        </div>
        <div class="footer__timetable">
          {{ schedule('common-time') }}
        </div>
      </div>
      <div class="footer__timetable footer__timetable_lunch">
        {{ schedule('lunch') }}
      </div>
    </div>
    <div class="footer__ratings">
      <div
        v-for="rating in snw"
        :key="rating.id"
        class="footer__snw"
      >
        <a
          :href="rating.url"
          class="footer__link"
          target="_blank"
        >
          <div class="footer__logo">
            <img
              class="footer__img"
              :src="rating.logo"
              :alt="rating.name"
            >
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import timetable from 'static/json/timetable'
/**
 * Я заметил, что ты в нескольких местах импортируешь эти данные. Наверное, логично было бы подключить стору,
 * запрашивать данные там и хранить в ней же.
 *
 * Совсем круто будет - это вынести получение данных в отдельный апи-слой (не в стору),
 * и к примеру, когда тебе надо будет получать их не из json, а с какого-нибудь апи, то ты просто поменяешь в этом слое.
 * Короче, это про букву D в SOLID
 */
import content from 'static/json/content'

export default {
  name: 'Footer',
  data () {
    return {
      snw: content.footer['social-network-website'] // тут сокращение запутывает, мне кажется. Лучше бы полностью назвать
    }
  },
  methods: {
    /**
     *  Обычно метод это действие, поэтому именуют их начиная с глагола. Ну и по неймингу `which` не оч ясно что это такое)
     */
    schedule (which) {
      const dayOfWeek = new Date().getDay()
      const open = timetable[dayOfWeek].timeOpen
      const close = timetable[dayOfWeek].timeClose
      if (which === 'common-text') {
        return `${content.footer.timetable} `
      } else if (which === 'common-time') {
        return `${content.footer.from}
      ${open} ${content.footer.to} ${close}`
      } else {
        return `${content.footer.lunch}`
      }
    },
  },
}
</script>

<style lang="scss">
.footer {
  width: 100%;
  min-height: 42px;
  background-color: #c9f2f2;
  display: flex;
  align-content: center;
  justify-content: space-around;
  align-items: center;
  &__timetables {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    padding: 2px 8px;
  }
  &__timetable{
    margin-right: 8px;
    white-space: nowrap;
    &_common {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
    }
  }
  &__ratings {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: flex-end;
    padding: 2px;
  }
  &__logo {
    padding: 2px;
    margin-right: 5px;
  }
  &__img {
    background-color: #ffffff;
    border-radius: 10px;
    max-width: 20px;
    max-height: 20px;
  }
}
</style>
