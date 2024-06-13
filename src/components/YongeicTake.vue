<!-- #todo 240212: 풀다가 다른 화면으로 이동하려고 할 때 인터셉트 해서 주의 alert창 띄워주기 -->
<script setup>
    import LoadingBar from '@/components/LoadingBar.vue';
</script>


<template>
    <LoadingBar :isLoading="isLoading"></LoadingBar>
    <q-page-sticky class="z-forward" position="bottom-right" :offset="[18, 18]">
        <q-btn 
            :class="{ 'btn-jittery' : isAllAnswered }"
            fab icon="send" 
            color="accent" 
            label="&nbsp;&nbsp;제출하기" 
            padding="md"
            @click="submit"
        />
    </q-page-sticky>

    <div class="q-pa-xl items-start q-gutter-md" style="width: 100%;">
        <div class="q-gutter-y-md">
            <q-card>
                <q-tabs v-model="currentQuestionNumber" dense class="text-grey" active-color="primary"
                    indicator-color="primary" align="justify" narrow-indicator>
                    <template v-for="(item, index) in questions" :key="item.id">
                        <q-tab :class="{ 'complete': isAnswered(item) }" :name="index + 1" :label="'문제' + (index + 1)" />
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
                    <div v-for="el in currentQuestion.choice.options" :key="el.seq">
                        <q-radio v-model="currentQuestion.answer" :val="el.seq" :label="el.value" />
                    </div>
                </template>
                <template v-if="currentQuestion.type === 'OX'">
                    <q-radio v-model="currentQuestion.answer" :val="1" label="YES" />
                    <q-radio v-model="currentQuestion.answer" :val="0" label="NO" />
                </template>
                <template v-if="currentQuestion.type ==='KEYWORD'">
                    <q-input 
                        outlined v-model="currentQuestion.answer" 
                        label="정답은?" 
                    />
                </template>
            </q-card-section>
        </q-card>
    </div>

</template>

<script>
import { utils } from '@/util/common.js';
import { apiCall } from '@/util/apiCall.js';
import { API_LIST } from '@/constants/apiList.js';

export default {
    emits: ['show-result'],
    data() {
        return {
            examId: this.$route.params.id,
            examMeta: {},
            questions: [],
            currentQuestionNumber: 1,
            currentQuestion: {},
            isLoading: false,
        }
    },
    mounted() {
        this.loadExam();
    },
    methods: {
        async loadExam() {
            const result = await apiCall(API_LIST.LOAD_EXAM(this.examId));
            if (result.status) {            
                this.examMeta.name = result.data.examName;
                this.examMeta.writer = result.data.writer;

                this.questions = result.data.questions;
                this.currentQuestion = this.questions[this.currentQuestionNumber - 1];
            }
        },
        changeQuestion(direction) {
            if (direction === 'prev') {
                this.currentQuestionNumber -= 1;
                return;
            } 
            this.currentQuestionNumber += 1;
        },
        async submit() {
            if (!this.isAllAnswered) {
                alert('답안이 작성되지 않은 문항이 있습니다.');
                return false;
            }

            const answers = this.questions.map((item) => {
                const userAnswer = {
                    questionType: item.type,
                    quizAnswer: null,
                    keywordAnswer: null,
                };

                if (item.type === 'QUIZ' || item.type === 'OX') {
                    userAnswer.quizAnswer = item.answer;
                } else if (item.type === 'KEYWORD') {
                    userAnswer.keywordAnswer = item.answer;
                }

                return userAnswer;
            });

            const paramters = {
                examId: this.examId,
                answers,
            };
            this.isLoading = true;
            const result = await apiCall(API_LIST.SUBMIT_EXAM, paramters)
            this.isLoading = false;

            if (result.status) {
                this.$emit('show-result', result.data);
            }
        },
        isAnswered(item) {          
            const {answer, type} = item;

            if (type === 'KEYWORD') {
                return utils.isNotEmpty(answer);
            }

            return answer >= 0;
        },
    },
    computed: {
        isAllAnswered() {
            let count = 0;
            this.questions.forEach((item) => {
                if (this.isAnswered(item)) {
                    count += 1;
                }
            });
            return this.questions.length === count;
        },
    },
    watch: {
        currentQuestionNumber(newNumber) {
            this.currentQuestion = this.questions[newNumber - 1];
        },
    }
}
</script>

<style scoped>
    .complete {
        background-color: yellow !important;
    }

</style>

<style lang="scss" scoped>

.btn-jittery {    
    animation: jittery 3s infinite;
}

@keyframes jittery {
  5%,
  50% {
    transform: scale(1);
  }

  10% {
    transform: scale(0.9);
  }

  15% {
    transform: scale(1.15);
  }

  20% {
    transform: scale(1.15) rotate(-5deg);
  }

  25% {
    transform: scale(1.15) rotate(5deg);
  }

  30% {
    transform: scale(1.15) rotate(-3deg);
  }

  35% {
    transform: scale(1.15) rotate(2deg);
  }

  40% {
    transform: scale(1.15) rotate(0);
  }
}

</style>