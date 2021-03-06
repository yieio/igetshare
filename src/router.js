import VueRouter from 'vue-router'
import Index from './views/Index.vue'
import ClassLessons from './views/ClassLessons.vue'
import ShareLessons from './views/ShareLessons.vue'
import IgetLogin from './views/IgetLogin.vue'

const router = new VueRouter({    
    routes: [{
            path: '/',
            name: 'class',
            component: Index,
            props: (route) => ({ 
                userName: route.query.userName,
                nickname: route.query.nickname,
                avatar: route.query.avatar
            })
        },
        {
            path: '/lesson',
            name: 'lesson',
            component: ClassLessons,
            props: (route) => ({
                classId: route.query.classId,
                userName:route.query.userName,
                q:route.query.q
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
        },
        {
            path: '/igetlogin',
            name: 'igetlogin',
            component: IgetLogin,
            props: (route) => ({
                lessonIds: route.query.lessonIds,
                title: route.query.title,
                author: route.query.author
            })
        }
    ]
})

export default router;