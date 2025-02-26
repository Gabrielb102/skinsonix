import { createMemoryHistory, createRouter } from 'vue-router'

import TreatmentSelection from '@views/TreatmentSelection.vue'

const routes = [
  { path: '/treatments', component: TreatmentSelection },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})