<!-- todo 240310: 용세이 컨테스트 결과 공유하기 기능 구현 -->
<template>
    <div class="col items-center">
        <h3>용세이 월드컵 우승자!</h3>
        <q-btn class="margin-updown" color="white" text-color="black" label="다시하기" @click="restart"></q-btn>            
        
        <!-- <q-img 
            :src="S3 + winningResult.finalItem.fileName"
            fit="cover"
            style="width: 50%;"
        >
            <div class="absolute-top custom-caption">
                <div class="text-subtitle1">{{ winningResult.finalItem.content }}</div>
            </div>                
        </q-img> -->

        <q-card class="my-card half-width" flat bordered>
            <q-card-section style="background-color: aliceblue;">
                <div class="text q-mb-xs" v-dompurify-html="winningResult.finalItem.content"/>                        
            </q-card-section>

            <img :src="`${S3}${winningResult.finalItem.fileName}`">
        </q-card>

        <div class="text-h5 text-center q-mt-md" >
            현재까지 {{ winningResult.winningStatistics.winningRate + '%'}}의 사냥개들이 해당 용세이를 숭배하였습니다.
            <br><br>용멘..
        </div>
        
    </div>

</template>

<script>
    import {apiCall} from '@/util/apiCall.js';
    import { API_LIST } from '@/constants/apiList.js';

    export default {
        emits: ['restart'],
        props: {
            winningResult: {
                type: Object,
            },
        },
        data() {
            return {
                S3: import.meta.env.VITE_S3_URL,
            }
        },
        mounted() {

        },
        methods: {
            restart() {
                this.$emit('restart');
            }
        }
    }
</script>

<style scoped>

.half-width {
    width: 50%;
}

.items-center {
    display: flex;
    flex-direction: column;
}

.margin-updown {
    margin-bottom: 15px;
}

</style>