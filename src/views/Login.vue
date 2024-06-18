<script setup>
    import google from '@/assets/img/google-logo.png';
    import gallaxy from '@/assets/img/gallaxy.png';

    import { GOOGLE_AUTH_URL } from '@/constants/loginInfo';
</script>

<template>
    
    <div class="q-pa-xl items-center">
        <div style="display: flex; justify-content: center;">
            <img :src="gallaxy" alt="갤럭시" style="width: 100%; height: 20%;"/>
        </div>
        <br>
        <div class="q-gutter-y-md column" >
            <q-input outlined v-model="email" label="아이디" :dense="false" />
            <q-input type="password"  outlined v-model="password" label="비밀번호" :dense="false" />            

            <q-btn color="black" text-color="white" label="Hello CHAN HO!" @click="submit"></q-btn>            
        </div>    
        <br>         
        <div class="q-gutter-y-md column items-end" style="padding: 5px 0 5px 0">
            간편로그인 (현재는 구글만 지원..)
        </div>   
        <div style="display: flex; flex-direction: row; justify-content: end;" >            
            <!-- <a :href="GOOGLE_AUTH_URL" style="border: 1px black solid;">
                <img :src="google" alt="구글 로그인"/>
            </a> -->
            &nbsp;&nbsp;&nbsp;
            <a :href="GOOGLE_AUTH_URL" style="border: 1px black solid;">
                <img :src="google" alt="구글 로그인"/>
            </a>

        </div>
    </div>

</template>

<script>
import {ACCESS_TOKEN} from '@/constants/loginInfo';
import store from '@/vuex/store';
import { apiCall } from '@/util/apiCall';
import { API_LIST } from '@/constants/apiList.js';


export default {
    data() {
        return {
            email: '',
            password: '',
        }
    },
    mounted() {

    },
    methods: {
        async submit() {
            const userData = {
                email: this.email,
                password: this.password,
            }
            const result = await apiCall(API_LIST.LOGIN, userData);
            
            if (result?.accessToken) {
                localStorage.setItem(ACCESS_TOKEN, result.accessToken);
                this.updateUserInfo();
                this.$router.push('/');
            } else {
                if (result.errorType == 'BadCredentialsException') {
                    alert('아이디 혹은 비밀번호가 잘못되었습니다.');
                }
            }
        },
        async updateUserInfo() {
            const response = await apiCall(API_LIST.GET_USER_INFO);
            if (response.id) {      
                console.log('폼로그인 유저정보 세팅');
                store.commit('loginSuccess', response);
                return true;
            }
        },
    }
}
</script>
