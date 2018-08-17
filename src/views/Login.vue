<template>
    <div class="login" v-loading.fullscreen.lock="state.isInProgress">
        <div>
            <img class="logo" src="../assets/logo.png" alt="MeetVp logo">
        </div>
        <el-alert title="Une erreur est survenue" type="error" v-if="state.isError"></el-alert>
        <el-button class="login-button" type="danger" plain round @click="authenticate()">Login with Meetup</el-button>
    </div>
</template>

<script>
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Action, Getter, Mutation, State } from 'vuex-class';


@Component
export default class Login extends Vue {
    @State(state => state) state
    @Getter('isAuthenticated') isAuthenticated
    @Action('setAuth') setAuth
    @Action('setLoading') setLoading
    @Action('setError') setError

    data() {
        return {
            provider: 'meetup'
        }
    }

    async authenticate () {
      try {
            await this.$auth.authenticate(this.provider)
            await this.setAuth()

            if(this.isAuthenticated) {
                console.log("logged in")
                this.$router.push({name: "Dashboard"})
            }
        }
        catch(err) {
            await this.setLoading({isInProgress: false})
            await this.setError({isError: true})
            console.log(err)
        }
    }

}
</script>

<style>
    .login {
        margin-top: 33%
    }
    .logo {
        width: 80%;
        max-width: 500px;
    }

    .login-button {
        margin-top: 20%
    }
</style>