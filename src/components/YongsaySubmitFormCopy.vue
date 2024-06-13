<template>
    <div class="q-pa-md items-center">
        <div class="q-gutter-y-md column" style="width: 80%;">
            <q-input class="font-1-5" placeholder="하하하하하하" v-model="content" filled autogrow />
            <div>
                <q-btn-toggle v-model="categoryId" toggle-color="primary" :options="categories" />
            </div>

            <!-- todo 240313: 전역변수화 -->
            <!-- <q-uploader style="max-width: 300px" url="http://localhost:8087/upload" label="이미지 업로드" accept=".jpg, image/*" -->
            <q-uploader style="max-width: 300px" url="http://3.38.51.154:8087/upload" label="이미지 업로드" accept=".jpg, image/*"
                :hide-upload-btn="true" @rejected="onRejected" @change="onChanged" @added="onUploaded" />

            <q-btn color="primary" @click="submit">전송</q-btn>

            <div class="q-pa-md">
                <q-ajax-bar ref="bar" position="bottom" color="accent" @stop="alertMessage" size="15px" skip-hijack />
            </div>
        </div>
    </div>
</template>

<script>
import { apiCall, apiCallWithFileUpload } from '@/util/apiCall.js';
import { API_LIST } from '@/constants/apiList.js';

export default {
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
        onUploaded(files) {
            this.selectedFile = files[0];
        },
        async submit() {
            if (!this.selectedFile) {
                alert('업로드 할 파일을 선택해주세요.');
                return;
            }
            // Vue 2에서는 this.$refs를 사용하여 ref에 접근합니다.
            this.$refs.bar.start();
            const parameters = {
                content: this.content,
                categoryId: this.categoryId,
            };
            
            const result = await apiCallWithFileUpload(API_LIST.SUBMIT_YONGSAY, parameters, this.selectedFile);
            this.$refs.bar.stop();
            if (result.status) {
                alert(result.message);
            }
        },
        alertMessage() {
            alert('hi');
        },
        async getCategories() {
            const result = await apiCall(API_LIST.GET_CATEGORIES);
            if (result.status) {
                this.categories = result.data;
            }
        },
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