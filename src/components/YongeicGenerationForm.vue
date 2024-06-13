<!-- #todo 240206: 문제순서 드래그로 변경 가능하도록-->
<!-- #todo 240206: 시험지 출제될 때마다 비밀번호 걸고 비번 아는 사람만 수정 가능하도록 하기 -->
<!-- #todo 240212: 출제 화면은 pc에서만 가능하도록 유효성 검사 넣기 -->

<template>
    <q-page-sticky position="top-right" :offset="[18, 18]">
        <q-btn         
            fab icon="add" 
            color="accent" 
            label="문제추가" 
            padding="sm"
            @click="addQuestion"
        />
        <br><br>
    </q-page-sticky>
    
    <div>
        <div class="q-pa-md row wrap justify-start items-start content-start" v-for="(item, index) in exam" :key="item.id">
            <div class="q-pa-md" style="overflow: auto; min-width: 90%;">
                <span class="text-h5">- {{ index + 1}}번 문제 -</span>
                <q-btn v-if="this.exam.length > 1" @click="deleteQuestion(index)">삭제</q-btn>
            </div>
            <div class="q-pa-md" style="overflow: auto; min-width: 45%;">
                <q-select v-model="item.type" 
                    :options="questionTypes" 
                    hint=""
                    label="문제유형" />
            </div>
            <div class="q-pa-md" style="overflow: auto; min-width: 45%;" >
                <q-input
                    v-model.number="item.score"
                    type="number"
                    label="문항배점"
                    hint=""                
                />
            </div>
            <div class="q-pa-md" style="overflow: auto; width: 90%;">
                <q-input 
                    outlined v-model="item.title" 
                    label="문제 제목을 입력해주세요" 
                />
            </div>
            <div class="q-pa-md" style="overflow: auto; width: 90%;">
                <div class="q-pa-sm rounded-borders">
                    문제 내용
                </div>
                <div :id="'editor' + item.id"></div>
            </div>

            <div class="q-pa-md" style="width: 90%;">
                <template v-if="item.type.value ==='QUIZ'">
                    <div class="q-pa-sm rounded-borders">
                        객관식 보기 및 정답 설정
                    </div>
                    <div class="q-pa-sm fit row wrap justify-start items-center content-start">
                        <q-radio class="q-mr-sm" val=1 v-model="item.quizAnswer" />
                        <q-input 
                            style="width: 90%"
                            outlined v-model="item.options.val1" 
                            label="1번 선지" 
                        />
                    </div>
                    <div class="q-pa-sm fit row wrap justify-start items-center content-start">
                        <q-radio class="q-mr-sm" val=2 v-model="item.quizAnswer"/>
                        <q-input 
                            style="width: 90%"
                            outlined v-model="item.options.val2" 
                            label="2번 선지" 
                        />
                    </div>
                    <div class="q-pa-sm fit row wrap justify-start items-center content-start">
                        <q-radio class="q-mr-sm" val=3 v-model="item.quizAnswer"/>
                        <q-input 
                            style="width: 90%"
                            outlined v-model="item.options.val3" 
                            label="3번 선지" 
                        />
                    </div>
                    <div class="q-pa-sm fit row wrap justify-start items-center content-start">
                        <q-radio class="q-mr-sm" val=4 v-model="item.quizAnswer"/>
                        <q-input 
                            style="width: 90%"
                            outlined v-model="item.options.val4" 
                            label="4번 선지" 
                        />
                    </div>
                    <div class="q-pa-sm fit row wrap justify-start items-center content-start">
                        <q-radio class="q-mr-sm" val=5 v-model="item.quizAnswer"/>
                        <q-input 
                            style="width: 90%"
                            outlined v-model="item.options.val5" 
                            label="5번 선지" 
                        />
                    </div>                
                </template>
                <template v-if="item.type.value ==='KEYWORD'">
                    <div class="q-pa-sm rounded-borders">
                        단답형 문제 정답
                    </div>
                    <q-input 
                        outlined v-model="item.keywordAnswer" 
                        label="정답은?" 
                    />
                </template>
                <template v-if="item.type.value ==='OX'">
                    <div class="q-pa-sm rounded-borders">
                        OX 문제 정답 설정
                    </div>
                    <q-radio v-model="item.quizAnswer" val=1 label="YES" />
                    <q-radio v-model="item.quizAnswer" val=0 label="NO" />
                </template>
            </div>
        </div>
        <q-btn color="primary" label="등록하기" style="width: 100%;" @click="openModal"></q-btn>            
    </div>

    <q-dialog v-model="showModal" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">[ 용익 출제정보 입력 ]</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
            <span>전체 문항: {{ exam.length }}개</span>
        </q-card-section>
        <q-card-section class="q-pt-none">
            <span>총점: {{ totalScore }}점</span>
        </q-card-section>


        <q-card-section class="q-pt-none">
          <q-input type="text" v-model="examMeta.title" label="용익시험 제목" dense autofocus />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input type="text" v-model="examMeta.writer" label="출제 사냥개" dense autofocus />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input type="text" v-model="examMeta.password" label="비밀번호" dense autofocus />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="취소" v-close-popup />
          <q-btn flat label="출제하기" @click="saveExam" />
        </q-card-actions>
      </q-card>
    </q-dialog>



</template>

<script>
import { apiCall } from '@/util/apiCall.js';
import { API_LIST } from '@/constants/apiList.js';
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { utils } from '@/util/common.js';

export default {
    data() {
        return {
            S3: import.meta.env.VITE_S3_URL,
            id: 1,
            questionTypes: [
                {label: '객관식', value: 'QUIZ'},
                {label: '단답형', value: 'KEYWORD'},
                {label: 'OX문제', value: 'OX'},
            ],
            exam: [],
            showModal: false,
            examMeta: {
                title: '',
                writer: '',
                password: '',
            },
        }
    },
    mounted() {
        this.addQuestion();
    },
    methods: {
        addQuestion() {
            const newQuestionId = this.id;
            const newQuestion = {
                id: newQuestionId,
                score: 0,
                type: this.questionTypes[0],
                title: '',
                content: '',
                options: {},
                quizAnswer: undefined,
                keywordAnswer: '',
            };
            this.exam.push(newQuestion);

            // memo 240206: nextTick 관련 설명 - https://chat.openai.com/share/0117a6eb-2255-429e-abb2-04087095eb0b 참조
            this.$nextTick(() => {
                newQuestion.editor = new Editor({
                    el: document.querySelector('#editor' + newQuestionId),
                    height: '200px',
                    initialEditType: "wysiwyg",
                });
            });

            this.id = this.id + 1;
        },
        deleteQuestion(index) {
            this.exam.splice(index, 1);            
        },
        openModal() {
            for (let i=0; i<this.exam.length; i++) {
                if (!this.validateQuestion(this.exam[i])) {
                    alert(i + 1 + '번 문항에 대한 출제를 완료해주세요');
                    return false;
                }
            }

            this.showModal = true;
        },
        async saveExam() {
            if (!this.validateExamMeta()) {
                return false;
            }

            const questions = [];
            let scorePerfect = 0;
            this.exam.forEach((item) => {
                item.content = item.editor.getHTML();
                const questionInfo = utils.clone(item);

                questionInfo.editor = null;
                const type = item.type.value;
                questionInfo.type = type;

                if (type === 'QUIZ') {
                    const quizData = {
                        options: [
                            { seq: 1, value: item.options.val1 },
                            { seq: 2, value: item.options.val2 },
                            { seq: 3, value: item.options.val3 },
                            { seq: 4, value: item.options.val4 },
                            { seq: 5, value: item.options.val5 },
                        ]
                    };
                    questionInfo.choice = JSON.stringify(quizData);
                }
                if (type === 'QUIZ' || type === 'OX') {
                    item.keywordAnswer = null;
                }

                if (type === 'KEYWORD') {
                    item.quizAnswer = null;
                }
                
                questions.push(questionInfo);
                scorePerfect += Number.parseInt(item.score);
            });

            const {title, writer, password} = this.examMeta;

            const paramters = {
                exam: questions,
                scorePerfect,   // 만점
                examName: title,
                writer,
                password
            }

            const result = await apiCall(API_LIST.SAVE_EXAM, paramters);
            if (result.status) {
                alert(result.message);
                this.$router.push('/yongeic')
            }

        },
        validateQuestion(question) {
            if (utils.isEmpty(question.title)) {
                return false;
            }

            const type = question.type.value; 
            if (type === 'QUIZ')  {
                if (!question.quizAnswer) {                    
                    return false;
                }
                if (Object.keys(question.options).length !== 5) {
                    return false;
                }
            }

            if (type === 'OX')  {
                if (!question.quizAnswer) {
                    return false;
                }
            }

            if (type === 'KEYWORD')  {
                if (utils.isEmpty(question.keywordAnswer)) {                    
                    return false;
                }
            }

            return true;
        },
        validateExamMeta() {
            const {title, writer, password} = this.examMeta;
            if (utils.isEmpty(title)) {
                alert('용익시험 제목을 입력해주세요');
                return false;
            }

            if (utils.isEmpty(writer)) {
                alert('출제사냥개 항목이 비어있습니다');
                return false;
            }

            if (utils.isEmpty(password)) {
                alert('비밀번호를 입력하세요');
                return false;
            }

            return true;
        },
    },
    computed: {
        totalScore() {
            return this.exam.reduce((sum, question) => sum + question.score, 0);
        },
    }
}
</script>

<style scoped>
    

</style>