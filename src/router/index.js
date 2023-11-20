// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { useMoviesStore } from '@/store/moviesStore'

const routes = [
  // {
  //   path: '/',
  //   component: () => import('@/layouts/default/Default.vue'),
  //   children: [
  //     {
  //       path: '',
  //       name: 'Home',
  //       // route level code-splitting
  //       // this generates a separate chunk (Home-[hash].js) for this route
  //       // which is lazy-loaded when the route is visited.
  //       component: () => import('@/views/Home.vue'),
  //     },
  //   ],
  // },

      {
        path: '/all',
        component: ()=> import('../components/Tabs/AllTab.vue'),
        
      },
      {
        path: '/search/:id',
        name: 'Search',
        component: ()=> import('../components/Tabs/SearchTab.vue'),
      },
      {
        path: '/bookmark',
        component: () => import('../components/Tabs/BookmarkTab.vue'),   
      },
      {
        path: '/film/:id',
        name: 'film',
        component: () => import('../components/Tabs/MovieDetailTab.vue'),
      },
      {
        path: '/',
        name:'home',
        component: () => import('../components/Tabs/Home.vue'),
      },
      
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to) => {

  const moviesStore = useMoviesStore()

})

export default router
