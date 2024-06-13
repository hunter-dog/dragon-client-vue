<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">홈</RouterLink>
        <RouterLink to="/yongsay/submit">용세이작성폼</RouterLink>
        <RouterLink to="/yongniverse">용니버스</RouterLink>
        <RouterLink to="/yongsay/contest">용세이월드컵</RouterLink>
        <RouterLink to="/yongeic">용익모의고사</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<template>
    <div>    
        <div>    
            <img :src="S3 + yongsay.fileName">    
        </div>
    
        <div>    
            <span>[{{ yongsay.categoryName }}]</span>    
            <br>    
            <span>{{ yongsay.content }}</span>    
        </div>    
    </div>            
    <button @click="getRandomYongsay()">다른 용언 보기</button>
</template>



<template>
    <textarea id="content" placeholder="용say 작성 공간" v-model="content"></textarea>

    <select v-model="categoryId">
        <option v-for="category in categories" :value="category.id" :key="category.id">
            {{ category.name }}
        </option>
    </select>
    <input type="file" @change="handleFileUpload" />
    <button @click="submit">전송</button>

    <div class="q-pa-md">
        <q-ajax-bar ref="bar" position="bottom" color="accent" size="10px" skip-hijack />

        <q-btn color="primary" label="Trigger" @click="trigger" />
    </div>
</template>

<script>
import { apiCall, apiCallWithFileUpload } from '@/util/apiCall.js';
import { API_LIST } from '@/constants/apiList.js';
import { ref } from 'vue'


export default {
    setup() {
        const bar = ref(null)

        // we manually trigger it (this is not needed if we
        // don't skip Ajax calls hijacking)
        function trigger() {
            const barRef = bar.value
            barRef.start()

            setTimeout(() => {
                const barRef = bar.value
                if (barRef) {
                    barRef.stop()
                }
            }, 2000)
        }

        return {
            bar,
            trigger,
            text: ref('Field content'),
            dense: ref(false)
        }
    },

    data() {
        return {
            content: '',
            selectedFile: null,
            categoryId: 1,
            categories: [],
        }
    },
    mounted() {
        this.getCategories();
    },
    methods: {
        handleFileUpload(event) {
            this.selectedFile = event.target.files[0];
        },
        submit() {
            if (!this.selectedFile) {
                alert('업로드 할 파일을 선택해주세요.');
                return;
            }
            const parameters = {
                content: this.content,
                categoryId: this.categoryId,
            };
            const result = apiCallWithFileUpload(API_LIST.SUBMIT_YONGSAY, parameters, this.selectedFile);
            if (result.status) {
                alert(result.message);
            }
        },
        async getCategories() {
            const result = await apiCall(API_LIST.GET_CATEGORIES);
            if (result.status) {
                this.categories = result.data;
            }
        }
    }
}
</script>

<style scoped>
    .items-center {
        display: flex; 
        justify-content: center; 
        align-items: center;        
    }
    .font-1-5 {
        /* font-size: 1.5rem; */
    }
</style>

<template>
        <button @click="addQuestion">문제 추가</button>
    <div v-for="(item, index) in exam" :key="item.id">
        <span>{{ index + 1 }}번 문항</span>
        <br>
        <label>문제유형: </label>
        <select v-model="item.type">
            <option v-for="el in EXAM_TYPES" :value="el.type" :key="el.id">
                {{ el.name }}
            </option>
        </select>

        <label>제목: </label>
        <input type="text" v-model="item.title" />

        <label>문항배점: </label>
        <input type="text" v-model="item.score">

        <br><br>
        <label>지문</label>
        <div :id="'editor' + item.id"></div>

        <div v-if="item.type === 'QUIZ'">
            <input type="radio" value="1" v-model="item.quizAnswer">
            <label>보기1: </label>
            <input type="text" v-model="item.options.val1" />
            <br>

            <input type="radio" value="2" v-model="item.quizAnswer">
            <label>보기2: </label>
            <input type="text" v-model="item.options.val2" />
            <br>

            <input type="radio" value="3" v-model="item.quizAnswer">
            <label>보기3: </label>
            <input type="text" v-model="item.options.val3" />
            <br>

            <input type="radio" value="4" v-model="item.quizAnswer">
            <label>보기4: </label>
            <input type="text" v-model="item.options.val4" />
            <br>

            <input type="radio" value="5" v-model="item.quizAnswer">
            <label>보기5: </label>
            <input type="text" v-model="item.options.val5" />
            <br>
        </div>

        <div v-if="item.type === 'KEYWORD'">
            <label>정답: </label>
            <input type="text" v-model="item.keywordAnswer" />
        </div>

        <div v-if="item.type === 'OX'">
            <input type="radio" :value="1" v-model="item.quizAnswer">
            <label>YES</label>

            <input type="radio" :value="0" v-model="item.quizAnswer">
            <label>NO</label>
        </div>


    </div>

</template>


<template>
    
    <button @click="addQuestion">문제 추가</button>
    <div v-for="(item, index) in exam" :key="item.id">
        <span>{{ index + 1 }}번 문항</span>
        <br>
        <label>문제유형: </label>
        <select v-model="item.type">
            <option v-for="el in EXAM_TYPES" :value="el.type" :key="el.id">
                {{ el.name }}
            </option>
        </select>

        <label>제목: </label>
        <input type="text" v-model="item.title" />

        <label>문항배점: </label>
        <input type="text" v-model="item.score">

        <br><br>
        <label>지문</label>
        <div :id="'editor' + item.id"></div>

        <div v-if="item.type === 'QUIZ'">
            <input type="radio" value="1" v-model="item.quizAnswer">
            <label>보기1: </label>
            <input type="text" v-model="item.options.val1" />
            <br>

            <input type="radio" value="2" v-model="item.quizAnswer">
            <label>보기2: </label>
            <input type="text" v-model="item.options.val2" />
            <br>

            <input type="radio" value="3" v-model="item.quizAnswer">
            <label>보기3: </label>
            <input type="text" v-model="item.options.val3" />
            <br>

            <input type="radio" value="4" v-model="item.quizAnswer">
            <label>보기4: </label>
            <input type="text" v-model="item.options.val4" />
            <br>

            <input type="radio" value="5" v-model="item.quizAnswer">
            <label>보기5: </label>
            <input type="text" v-model="item.options.val5" />
            <br>
        </div>

        <div v-if="item.type === 'KEYWORD'">
            <label>정답: </label>
            <input type="text" v-model="item.keywordAnswer" />
        </div>

        <div v-if="item.type === 'OX'">
            <input type="radio" :value="1" v-model="item.quizAnswer">
            <label>YES</label>

            <input type="radio" :value="0" v-model="item.quizAnswer">
            <label>NO</label>
        </div>


    </div>

    <button @click="saveExam">시험지 저장</button>

</template>

