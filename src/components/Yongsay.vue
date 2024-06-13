<template>
    <div class="q-pa-md column items-center q-gutter-md">
        <q-btn color="white" text-color="black" label="다른 용언 보기" @click="getRandomYongsay()"/>        

        <q-card class="my-card">
            <q-card-section>
                <div class="text-h6" v-dompurify-html="yongsay.content">
                </div>

                <div class="text-subtitle2">[{{ yongsay.categoryName }}]</div>
            </q-card-section>

            <img :src="S3 + yongsay.fileName">  

            <!-- <q-card-section class="q-pt-none">
                {{ 'lorem' }}
            </q-card-section> -->
        </q-card>
    </div>
    
</template>


<script>
import { apiCall } from '@/util/apiCall.js';
import { API_LIST } from '@/constants/apiList.js';

export default {
    data() {
        return {
            yongsay: {},
            S3: import.meta.env.VITE_S3_URL,
        }
    },
    mounted() {
        this.getRandomYongsay();
    },
    methods: {
        async getRandomYongsay() {
            const result = await apiCall(API_LIST.GET_RANDOM_YONGSAY, { id: this.yongsay.id });
            if (result.status) {
                this.yongsay = result.data;
            }
        }
    }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 60%
</style>