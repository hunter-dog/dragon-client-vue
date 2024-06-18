<template>
  <q-layout view="hhh lpR fFf">
    <q-header reveal class="bg-primary text-white" height-hint="98">

      <q-tabs align="center">
        <q-route-tab to="/" label="홈" />
        <q-route-tab to="/yongsay/submit" label="용세이 작성" />
        <q-route-tab to="/yongniverse" label="용니버스" />
        <q-route-tab to="/yongsay/contest" label="용세이월드컵" />
        <q-route-tab to="/yongeic" label="용익시험" />
        <q-route-tab to="/board" label="방명록" />
      </q-tabs>

      <div align="end" style="background-color: white; padding-top: 5px;">                
        <q-space></q-space>
        <q-btn color="pink" @click="signup" v-if="!user.isLoggedIn">회원가입</q-btn>
        <q-avatar rounded v-else>
          <img src="https://cdn.quasar.dev/img/avatar.png"> 
        </q-avatar>

        &nbsp;
        <q-btn color="red" @click="logout" v-if="user.isLoggedIn">로그아웃</q-btn>
        <q-btn color="red" @click="login" v-else>로그인</q-btn>
      </div>

    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
    import store from '@/vuex/store';

    export default {
        name: 'Header',
        computed: {
            user() {
                return this.$store.getters.getUser;
            }
        },
        mounted() {
            setTimeout(() => {
                console.log(this.user);
            }, 2000);
        },
        methods: {
            logout() {
                localStorage.removeItem('accessToken');
                store.commit('logoutSuccess');
                this.$router.push('/');
            },
            login() {                
                this.$router.push('/login');
            },
            signup() {
                this.$router.push('/signup');
            }
        }
    }    

</script>


<style scoped></style>
