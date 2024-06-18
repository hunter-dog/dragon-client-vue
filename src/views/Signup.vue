<template>
    <div class="q-pa-xl items-center">
        <div class="q-gutter-y-md column" >
            <div style="display: flex; justify-content: center;">
                <div style="font-size: large; font-weight: bold;">SignUp Form</div>
            </div>

            <q-input outlined v-model="email" label="아이디" />
            <q-input outlined v-model="nickname" label="닉네임"  />
            <q-input type="password" outlined v-model="password" label="비밀번호" />            

            <q-btn color="black" text-color="white" label="찬호의 동료가 된다" @click="submit"></q-btn>            
        </div>    
    </div>
</template>

<script>
    import {apiCall} from '@/util/apiCall.js';
    import { API_LIST } from '@/constants/apiList.js';

    export default {
        data() {
            return {
                nickname:'',
                email:'',
                password:'',
            }
        },
        mounted() {
        },
        methods: {
            async submit() {
                if (!this.validateUserData()) {            
                    return false;
                }

                const userData = {
                    name: this.nickname,
                    email: this.email,
                    password: this.password,
                }

                const result = await apiCall(API_LIST.SIGNUP, userData);
                if (result.status) {
                    alert('회원가입이 완료되었습니다. 로그인을 진행해주세요!');
                    this.$router.push('/login');
                }
            },
            validateUserData() {
                if (this.nickname == '') {
                    alert('닉네임을 입력하세요');
                    return false;
                } 
                if (this.email == '') {
                    alert('아이디를 입력하세요');
                    return false;
                }
                if (this.password == '') {
                    alert('비밀번호를 입력하세요');
                    return false;
                }
            }
        }
    }

</script>


