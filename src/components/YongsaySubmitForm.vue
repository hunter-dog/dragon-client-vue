<script setup>
    import LoadingBar from '@/components/LoadingBar.vue';
</script>

<template>
    <LoadingBar :isLoading="isLoading"></LoadingBar>
    <div class="q-pa-md items-center">
        <div class="q-gutter-y-md column" style="width: 80%;">
            <!-- <q-input class="font-1-5" 
                placeholder="네오신의 명언을 작성해주세요" 
                v-model="content" 
                filled 
                type="textarea"
                autogrow 
            /> -->

            <q-editor v-model="content" 
                placeholder="네오신의 명언을 작성해주세요"
                :toolbar="[
                    ['bold', 'italic', 'strike', 'underline'],
                ]" 
            />
                
            <div>
                <q-btn-toggle v-model="categoryId" toggle-color="primary" :options="categories" />
            </div>

            <q-uploader style="max-width: 300px" label="이미지 업로드" accept=".jpg, image/*"
                :hide-upload-btn="true" @added="onUploaded" />

            <q-btn color="white" text-color="black" label="등록하기" @click="submit"></q-btn>            
        </div>
    </div>
</template>

<script>

import { apiCall, apiCallWithFileUpload } from '@/util/apiCall.js';
import { utils } from '@/util/common.js';
import { API_LIST } from '@/constants/apiList.js';

export default {
    data() {
        return {
            isLoading: false,
            content: '',
            selectedFile: null,
            categoryId: 3,
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
            if (!this.validateForm()) {
                return;
            }
            const parameters = {
                content: this.content,
                categoryId: this.categoryId,
            };

            this.isLoading = true;
            const result = await apiCallWithFileUpload(API_LIST.SUBMIT_YONGSAY, parameters, this.selectedFile);
            this.isLoading = false;

            if (result.status) {
                alert(result.message);
            }
        },
        async getCategories() {
            const result = await apiCall(API_LIST.GET_CATEGORIES);
            if (result.status) {
                this.categories = result.data;
            }
        },
        validateForm() {
            if (!this.selectedFile) {
                alert('업로드 할 파일을 선택해주세요.');
                return false;
            }

            if (utils.isEmpty(this.content)) {
                alert('네오신의 명언란이 비어있습니다.');
                return false;
            }

            return true;
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