import VueRouter from 'vue-router'
import Index from './views/Index.vue'
import ClassLessons from './views/ClassLessons.vue'

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'class',
            component: Index
        },
        {
            path: '/lesson',
            name: 'lesson',
            component: ClassLessons,
            props:(route) => ({classId: route.query.classId })
        }
    ]
})

export default router;