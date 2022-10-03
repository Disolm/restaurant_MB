export default function ({ $axios, store }, inject) {
  const timetableApi = $axios.create({
    headers: {
      common: {
        Accept: 'text/plain, */*'
      }
    }
  })
  const contentApi = $axios.create()
  const buttonsMenuApi = $axios.create()

  timetableApi.setBaseURL('/json/timetable.json')
  contentApi.setBaseURL('/json/content.json')
  buttonsMenuApi.setBaseURL('/json/buttons-menu.json')

  inject('timetableApi', timetableApi)
  inject('contentApi', contentApi)
  inject('buttonsMenuApi', buttonsMenuApi)
}
