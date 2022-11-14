<template>
  <div class="footer">
    <div class="footer__wrapper">
      <div class="footer__timetables">
        <div class="footer__timetable footer__timetable_common">
          <div class="footer__timetable">
            {{ outputOfWorkSchedule('common-text') }}
          </div>
          <div class="footer__timetable">
            {{ outputOfWorkSchedule('common-time') }}
          </div>
        </div>
        <div class="footer__timetable footer__timetable_lunch">
          {{ outputOfWorkSchedule('lunch') }}
        </div>
      </div>
      <div class="footer__ratings">
        <div
          v-for="rating in socialNetworkWebsite"
          :key="rating.id"
          class="footer__socialNetworkWebsite"
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
    <div
      class="footer__margin"
    />
  </div>
</template>

<script>
import timetable from 'static/json/timetable'
import content from 'static/json/content'

export default {
  name: 'TheFooter',
  data () {
    return {
      socialNetworkWebsite: content.footer['social-network-website']
    }
  },
  methods: {
    outputOfWorkSchedule (subType) {
      const dayOfWeek = new Date().getDay()
      const open = timetable[dayOfWeek].timeOpen
      const close = timetable[dayOfWeek].timeClose
      if (subType === 'common-text') {
        return `${content.footer.timetable} `
      } else if (subType === 'common-time') {
        return `${content.footer.from}
      ${open} ${content.footer.to} ${close}`
      } else {
        return `${content.footer.lunch}`
      }
    },
  }
}
</script>

<style lang="scss">
.footer {
  width: 100%;
  height: $height-footer;
  &__wrapper {
    width: 100%;
    height: 100%;
    background: rgba($black, $opacity-header-and-footer);
    color: #dadada;
    display: flex;
    align-content: center;
    justify-content: space-around;
    align-items: center;
  }
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
  &__margin {
    width: 100%;
    background-color: $white;
  }
}
</style>
