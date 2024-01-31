import {createRouter, createWebHistory} from 'vue-router'

import userLogin from '../views/users/Login.vue'
import userRegistration from '../views/users/Registration.vue'
import userPersonal from '../views/users/Personal.vue'
import userIndex from '../views/users/Index.vue'
import userShow from '../views/users/Show.vue'
import userFeed from '../views/users/Feed.vue'

const router = createRouter({
    history : createWebHistory(import.meta.env.BASe_URL),
    routes: [
        {
            path : '/users/index',component: userIndex,
            name: 'user.index'

        },
        {
            path : '/users/:id/show',component: userShow,
            name: 'user.show'

        },
  {
            path : '/users/feed',component: userFeed,
            name: 'user.feed'

        },

        {
            path : '/users/login',component: userLogin,
            name: 'user.login'

        },

        {
            path : '/users/registration',component: userRegistration,
            name: 'user.registration'

        },
        {
            path : '/users/personal',component: userPersonal,
            name: 'user.personal'

        },



    ]
})

    router.beforeEach((to, from, next) => {
        axios.get('/api/user')
            .catch( e => {
                if ( e.response.status === 401) {
                    localStorage.key('x_xsrf_token') ? localStorage.removeItem('x_xsrf_token') : ''
                }
            })

        const token = localStorage.getItem('x_xsrf_token')

        if(!token) {
            if (to.name === 'user.login' || to.name === 'user.registration') {
                return next()
            } else {
                return next
                ({
                    name: 'user.login'
                })
            }
        }
        if (to.name === 'user.login' || to.name === 'user.registration' && token) {
            return next
            ({
                name: 'user.personal'
            })
        }
        next()
    })






export default router
