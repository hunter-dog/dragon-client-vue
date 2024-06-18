<template>
    <div>
        로그인 처리중입니다.
    </div>
</template>

<script>
    import {ACCESS_TOKEN} from '@/constants/loginInfo';
    import store from '@/vuex/store';
    import {API_LIST} from '@/constants/apiList.js';
    import {apiCall} from '@/util/apiCall.js';

    export default {
        data() {
            return {
                location: window.location,
            }
        },
        created: function() {      
            const token = this.getUrlParameter('token');
            const error = this.getUrlParameter('error');

            if (token) {
                localStorage.setItem(ACCESS_TOKEN, token);
                this.updateUserInfo();
                this.$router.push('/');
            } else {            
                alert('로그인 처리 도중 에러 발생 => ', error);
            }            
        },

        methods: {
            getUrlParameter(name) {
                name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
                let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
                let results = regex.exec(this.location.search);
                return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
            },
            async updateUserInfo() {
                const response = await apiCall(API_LIST.GET_USER_INFO);
                if (response.id) {      
                    console.log('Ouath2 유저정보 세팅');
                    store.commit('loginSuccess', response);
                    return true;
                }
            },
        }
    }
    
    
</script>


