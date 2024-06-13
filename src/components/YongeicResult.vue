<script setup>
    import looser from '@/assets/img/looser.png';
    import welcome from '@/assets/img/welcome.jpg';
</script>

<template>
    <main>
        <div class="q-pa-xl column items-center q-gutter-md">        
            <q-card class="my-card">
                <template v-if="result.scoreAcquired > result.scoreAverage">
                    <q-img :src="welcome">
                        <div class="absolute-bottom text-subtitle2 text-center">
                            <q-btn color="secondary" @click="moveToYongeicList">다른 용익 보러 가기</q-btn>
                        </div>
                    </q-img>
                </template>                
                <template v-else=>
                    <q-img :src="looser">
                        <div class="absolute-bottom text-subtitle2 text-center">
                            <q-btn color="secondary" @click="moveToYongeicList">다른 용익 보러 가기</q-btn>
                        </div>
                    </q-img>
                </template>

                <q-card-section class="items-center column">
                    <div>
                        <span class="text-h5">당신의 용익점수: {{ result.scoreAcquired }}점</span>
                        <span class="text-h6"> ({{ result.scorePerfect + '점 만점' }})</span>
                    </div>
                    <div v-if="result.scoreAcquired > result.scoreAverage">
                        <span>축하합니다, 당신은 네오신께서 인정한 저지능 커뮤니티 문맹인!! 🐶</span>
                    </div>
                    <div v-else>                
                        <span>그대는 아직 용익 점수가 부족한 사냥개로군.. 
                        <br>
                        TOP 1%가 되는 그날까지 혼보담당간님 화이팅!!</span>
                    </div>
                    <br>
                    <div>
                        <span>해당 용익의 사냥개 평균 점수: {{ result.scoreAverage }}점</span>
                    </div>
                
                </q-card-section>
            </q-card>
        </div>
    </main>
</template>

<script>
import {apiCall} from '@/util/apiCall.js';
import { API_LIST } from '@/constants/apiList.js';

export default {
    props: {
        result: {
            type: Object,
        }
    },
    data() {
        return {
        }
    },
    mounted() {
    },
    methods: {
        moveToYongeicList() {
            this.$router.push('/yongeic');
        }
    }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 60%
</style>