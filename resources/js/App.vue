<script>
export default {
    name: "App",
    data() {
        return {
            token: null,
        }
    },

    watch: {
        $route(to, from) {
            this.getToken()
        }
    },

    mounted() {
        this.getToken()
    },

    methods: {
        getToken() {
            this.token = localStorage.getItem('x_xsrf_token')
        },

        logout() {
            axios.post('/logout')
                .then(res => {
                    localStorage.removeItem('x_xsrf_token')
                    this.$router.push({name: 'user.login'})
                })
        }
    }
}
</script>

<template>
    <div>
        <div>
           <div class="ml-3">
               <router-link v-if="!token" :to="{name : 'user.login'}" class="ml-3">
                   Login
               </router-link>
           </div>
            <div class="mr-5"><router-link v-if="!token" :to="{name : 'user.registration'}">Registration</router-link></div>
            <div class="mx-auto"><router-link v-if="token" :to="{name: 'user.index'}">Users</router-link></div>
            <div class="mx-auto"><router-link v-if="token" :to="{name: 'user.feed'}">Feed</router-link></div>
            <div class="mx-auto"><router-link v-if="token" :to="{name: 'user.personal'}">Personal</router-link></div>
            <a v-if="token" @click.prevent="logout" href="#" class="bg-sky-400">Logout</a>
            <router-view></router-view>
        </div>
    </div>
</template>

<style scoped>

</style>
