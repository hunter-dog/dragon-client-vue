<template>
    <div class="q-pa-xl items-start q-gutter-md" style="width: 100%;">
        <div class="q-gutter-y-md">
            <q-card>
                <q-tabs v-model="currentQuestionNumber" dense class="text-grey" active-color="primary"
                    indicator-color="primary" align="justify" narrow-indicator>
                    <template v-for="(item, index) in questions" :key="item.id">
                        <q-tab :name="index + 1" :label="'문제' + (index + 1)" />
                    </template>
                </q-tabs>
            </q-card>
        </div>
        
        <q-card class="my-card" flat bordered>
            <q-card-section>
                <div class="fit row wrap justify-between items-start content-start">
                    <div class="text-h6 text-orange-9">[ {{ examMeta.name + ' by ' + examMeta.writer }} ]</div>
                    <div>
                        <q-btn                   
                            :disable="currentQuestionNumber === 1"                                     
                            color="standard" 
                            text-color="black"
                            icon="arrow_back_ios"
                            label="prev" 
                            @click="changeQuestion('prev')"
                        />
                        <q-btn         
                            :disabled="currentQuestionNumber === questions.length"                                                
                            color="standard" 
                            text-color="black"
                            icon-right="arrow_forward_ios" 
                            label="next" 
                            @click="changeQuestion('next')"
                        />
                    </div>
                </div>
                    
                <div class="text-h5 q-mt-sm q-mb-xs">
                    {{ currentQuestion.title }}                     
                    <span class="text-caption">({{ currentQuestion.score }}점)</span>
                </div>
                <div class="text-caption text-grey">                    
                    {{ '유형: ' + currentQuestion.type }}
                </div>
                <br>
                <div v-dompurify-html="currentQuestion.content"></div>

                <template v-if="currentQuestion.type ==='QUIZ'">
                    <div v-for="(el, index) in currentQuestion.choice.options" :key="el.seq">
                        <q-radio disable v-model="currentQuestion.quizAnswer" :val="el.seq" :label="el.value" />
                        <span>{{ printQuizStatistics(el.seq) }}</span>
                    </div>
                </template>
                <template v-if="currentQuestion.type === 'OX'">
                    <div v-for="(el, index) in [{seq: 0, value: 'NO'}, {seq: 1, value: 'YES'}]">
                        <q-radio disable v-model="currentQuestion.quizAnswer" :val="el.seq" :label="el.value" />
                        <span> {{ printQuizStatistics(el.seq) }}</span>
                    </div>
                </template>
                <template v-if="currentQuestion.type ==='KEYWORD'">
                    <q-input 
                        readonly
                        outlined v-model="currentQuestion.keywordAnswer" 
                        label="정답"
                    />

                    <br>
                    <div class="text-h5">사냥개 작성 답안</div>

                    <q-list bordered separator v-for="(item, index) in currentQuestion.statistic" :key="index">

                        <q-item v-ripple>
                            <q-item-section>
                            <q-item-label>{{ item.keywordAnswer }}</q-item-label>
                            <q-item-label caption>사냥개 {{ item.selectedCount }}마리가 작성한 답변입니다 ({{ item.selectedRate + '%' }})</q-item-label>
                            </q-item-section>
                        </q-item>

                    </q-list>

                </template>
            </q-card-section>
        </q-card>
    </div>

</template>

<script>
import { utils } from '@/util/common.js';
import { apiCall } from '@/util/apiCall.js';
import { API_LIST } from '@/constants/apiList.js';
import router from '@/router';

export default {
    emits: ['show-result'],
    data() {
        return {
            examId: this.$route.params.id,
            examMeta: {},
            questions: [],
            currentQuestionNumber: 1,
            currentQuestion: {},            
        }
    },
    mounted() {
        this.loadExam();
    },
    methods: {
        async loadExam() {
            const result = await apiCall(API_LIST.LOAD_EXAM(this.examId), {showAnswer: true});
            if (result.status) {
                this.examMeta.name = result.data.examName;
                this.examMeta.writer = result.data.writer;

                this.questions = result.data.questions;
                this.currentQuestion = this.questions[this.currentQuestionNumber - 1];
            }
            if (!this.currentQuestion.statistic) {
                this.currentQuestion.statistic = await this.getQuestionStatistic();
            }
            
        },
        changeQuestion(direction) {
            if (direction === 'prev') {
                this.currentQuestionNumber -= 1;
                return;
            } 
            this.currentQuestionNumber += 1;
        },
        async getQuestionStatistic() {
            const result = await apiCall(API_LIST.GET_YONGEIC_STATISTIC(this.currentQuestion.id))
            if (result.status) {
                if (result.data.length === 0) {
                    alert('아직 응시된 적이 없는 용익입니다.')
                    this.$router.push('/yongeic')
                }
                if (this.currentQuestion.type === 'KEYWORD') {  // 주관식인 경우 선택률 순으로 정렬
                    return result.data.sort((a, b) => {
                        return b.selectedRate - a.selectedRate;
                    })
                }

                return result.data;
            } else {
                alert('통계정보 조회 중 알 수 없는 오류 발생');
            }
        },
        printQuizStatistics(seq) {
            const stats = this.currentQuestion?.statistic;
            if (stats) {
                const stat = stats.find((item) => {
                    return item.quizAnswer === seq;
                });
                if (stat) {
                    return ` >> 사냥개 ${stat.selectedCount}마리가 선택하였습니다 (${stat.selectedRate}%)`
                } else {
                    return ' >> 사냥개 0마리가 선택하였습니다 (0%)'
                }
            }
        },
    },
    watch: {
        async currentQuestionNumber(newNumber) {
            this.currentQuestion = this.questions[newNumber - 1];
            if (!this.currentQuestion.statistic) {
                this.currentQuestion.statistic = await this.getQuestionStatistic();
            }
        },
    }
}
</script>

