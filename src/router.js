import VueRouter from 'vue-router'
import Index from './views/Index.vue'
import ClassLessons from './views/ClassLessons.vue'
import ShareLessons from './views/ShareLessons.vue'

const router = new VueRouter({    
    routes: [{
            path: '/',
            name: 'class',
            component: Index
        },
        {
            path: '/lesson',
            name: 'lesson',
            component: ClassLessons,
            props: (route) => ({
                classId: route.query.classId
            })
        },
        {
            path: '/sharelesson',
            name: 'sharelesson',
            component: ShareLessons,
            props: (route) => ({
                lessonIds: route.query.lessonIds,
                title: route.query.title,
                author: route.query.author
            })
        }
    ]
})

export default router;