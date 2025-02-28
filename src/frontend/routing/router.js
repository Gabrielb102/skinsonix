import { createMemoryHistory, createRouter } from 'vue-router'

import StartScreen from '@views/Start.vue'
import TreatmentSelectionScreen from '@views/TreatmentSelection.vue'
import TreatmentScreen from '@views/Treatment.vue'

const routes = [
  { path: '/', component: StartScreen },
  { path: '/select', component: TreatmentSelectionScreen },
  { path: '/treatment', component: TreatmentScreen },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router;