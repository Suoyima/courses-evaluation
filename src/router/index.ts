import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUserStore } from '../stores/userStore'

const baseUrl = typeof import.meta.env.BASE_URL === 'string' ? import.meta.env.BASE_URL : '/'

const router = createRouter({
  history: createWebHistory(baseUrl),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: '课程评价 - 首页' },
    },
    {
      path: '/course/:id',
      name: 'course-detail',
      component: () => import('../views/CourseDetail.vue'),
      props: true,
      meta: { title: '课程详情' },
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchView.vue'),
      meta: { title: '课程搜索' },
    },
    {
      path: '/review/publish',
      name: 'review-publish',
      component: () => import('../views/ReviewPublish.vue'),
      meta: {
        title: '发布评价',
        requiresAuth: true,
      },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

// 全局路由守卫
router.beforeEach(async (to) => {
  const userStore = useUserStore()

  // 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title as string
  }

  // 验证需要登录的路由
  if (to.meta.requiresAuth && !userStore.currentUser) {
    return {
      path: '/',
      query: { redirect: to.fullPath },
    }
  }
})

export default router
