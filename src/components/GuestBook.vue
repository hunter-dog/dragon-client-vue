<template>
    <!-- todo 240305: 1페이지 가장 위 댓글은 관리자 댓글 -->

    <!-- style="height: 150px; overflow-y: auto;" -->

    <q-card class="my-card">
        <div>
            <!-- #todo 240213: 에디터 텍스트 area font 크기 조정가능하도록 에디터 설정 다른 거로 갈아끼우기 -->
            <q-editor flat min-height="100px" max-height="150px" v-model="parentComment.content" 
                placeholder="※ 타인에 대한 근거없는 비난과 혐오표현은 예고 없이 삭제될 수 있습니다."
                :definitions="{
                    // save: {
                    //     tip: 'Save your work',
                    //     icon: 'save',
                    //     label: '저장하기',
                    //     handler: saveWork
                    // },
                    // upload: {
                    //     tip: 'Upload to cloud',
                    //     icon: 'cloud_upload',
                    //     label: '이미지 업로드',
                    //     handler: uploadIt
                    // }
                }" 
                :toolbar="[
                    ['bold', 'italic', 'strike', 'underline'],
                    // ['upload', 'save']
                ]" 
            />
        </div>
        

        <q-card-actions class="justify-end">
            <q-input type="text" v-model="parentComment.writer" label="닉네임" :dense="true" />
            &nbsp;&nbsp;
            <q-input type="password" v-model="parentComment.password" label="비밀번호" :dense="true" />
            &nbsp;&nbsp;
            <q-btn color="primary" @click="writeParentComment">등록하기</q-btn>
        </q-card-actions>
        
    </q-card>

    <br>

    <q-btn 
        :class="{'active': orderBy === 'timeDESC'}"
        @click="changeOrderBy('timeDESC')">
        최신순
    </q-btn>
    <q-btn 
        :class="{'active': orderBy === 'timeASC'}"
        @click="changeOrderBy('timeASC')">
        오래된순
    </q-btn>
    <q-btn 
        :class="{'active': orderBy === 'likesDESC'}"
        @click="changeOrderBy('likesDESC')">
        좋아요순
    </q-btn>

    <q-list bordered padding class="rounded-borders" style="width: 100%"
        v-for="item in totalGuestBook" :key="item.id">
        <q-item>
            <q-item-section class="q-pt-sm" avatar top>
                <q-avatar>
                    <img :src="item.avatarUrl">
                </q-avatar>
            </q-item-section>

            <q-item-section>
                <q-item-label caption>{{ item.writer }} | {{ momentUtil.getFromNow(item.createdAt) }}</q-item-label>
                <q-item-label class="parent-comment word-wrapper" 
                    lines=""
                    v-dompurify-html="item.content" 
                />
                <br>
                <!-- <q-item-label style="display: inline-block;" class="cursor-pointer" caption @click="toggleComments(item)">
                    댓글 ({{ item.childCount }})
                </q-item-label> -->
                <div class="reply-box">
                    <span class="cursor-pointer" @click="toggleComments(item)">댓글 ({{ item.childCount }})</span>
                </div>
            </q-item-section>

            <q-item-section side style="display: block">
                <q-icon class="cursor-pointer" name="thumb_up" color="blue" @click="addLikes(item)" /> {{ item.likes }} 
                <br><br>
                <q-icon class="cursor-pointer" name="thumb_down" color="red" @click="addDislikes(item)"/> {{ item.dislikes }}
            </q-item-section>
        </q-item>

        <div v-if="item.showComments">
            <div v-for="child in item.children" :key="child.id">
                <q-separator />

                <q-item class="bg-teal-1">
                    <q-item-section class="q-pt-sm" avatar top>
                        <q-avatar>
                            <img :src=child.avatarUrl>
                        </q-avatar>
                    </q-item-section>
                    
                    <q-item-section>
                        <q-item-label caption>{{ child.writer}} | {{ momentUtil.getFromNow(child.createdAt) }}</q-item-label>
                        <q-item-label class="word-wrapper" v-dompurify-html="child.content" />

                        <br>

                    <q-item-label class="cursor-pointer" caption>
                        &nbsp;
                    </q-item-label>

                    </q-item-section>

                    <q-item-section style="display: block" side>
                        <q-icon class="cursor-pointer" name="thumb_up" color="blue" @click="addLikes(child)" /> {{ child.likes }} 
                        <br><br>
                        <q-icon class="cursor-pointer" name="thumb_down" color="red" @click="addDislikes(child)"/> {{ child.dislikes }}
                    </q-item-section>
                </q-item>            
            </div>
            <div>
                <!-- #todo 240213: 에디터 텍스트area font 크기 조정가능하도록 에디터 설정 다른 거로 갈아끼우기 -->
                <q-editor flat min-height="100px" max-height="100px" v-model="item.childComment.content" 
                    placeholder="※ 타인에 대한 근거없는 비난과 혐오표현은 예고 없이 삭제될 수 있습니다."
                    :toolbar="[
                        ['bold', 'italic', 'strike', 'underline'],
                    ]" 
                />
            </div>
            <q-card-actions class="justify-end">
                <q-input type="text" v-model="item.childComment.writer" label="닉네임" :dense="true" />
                &nbsp;&nbsp;
                <q-input type="password" v-model="item.childComment.password" label="비밀번호" :dense="true" />
                &nbsp;&nbsp;
                <q-btn color="primary" @click="writeChildComment(item, item.childComment)">등록하기</q-btn>
            </q-card-actions>
        </div>
    </q-list>

    <Pagination :api="api" 
        :totalPages="totalPages" 
        :parameters="{orderBy: orderBy}"
        @renew-data="onRenewed" 
    />

</template>

<script>
import { apiCall } from '@/util/apiCall.js';
import { API_LIST, OPEN_API_LIST } from '@/constants/apiList.js';
import { ref, onMounted, computed, watch } from 'vue';
import {eventBus} from '@/util/eventBus.js';
import Pagination from '@/components/Pagination.vue';
import { utils } from '@/util/common';
import { momentUtil } from '@/util/moment';
import { orderBy } from 'lodash';


export default {
    components: {
        Pagination,
    },
    props: {
    },
    setup() {
        const api = API_LIST.GET_TOTAL_GUEST_BOOK;
        const orderBy = ref('timeDESC');
        const changeOrderBy = (newOrderBy) => {
            orderBy.value = newOrderBy;
        }
        
        const totalGuestBook = ref([]);
        const parentComment = ref({
            depth: 1,
            content: '',
            writer: '사냥개',
            password: '',
        });

        const totalPages = ref(0);
        const addLikes = async (item) => {
            const parameters = {
                isLike: true,
                id: item.id,
                tableName: 'guest_book'
            };

            const result = await apiCall(API_LIST.ADD_GUESTBOOK_LIKES, parameters)
            if (result.status) {
                item.likes = result.data.likes;
            } else {
                alert(result.message);
            }
        }

        const addDislikes = async (item) => {
            const parameters = {
                isLike: false,
                id: item.id,
                tableName: 'guest_book'
            };

            const result = await apiCall(API_LIST.ADD_GUESTBOOK_DISLIKES, parameters)
            if (result.status) {
                item.dislikes = result.data.dislikes;
            } else {
                alert(result.message);
            }
        }

        const loadGuestBook = async () => {
            const parameters = {
                orderBy: orderBy.value,
                page: 0,
                size: 10,   // #todo 240227: 하드코딩
            };
            const result = await apiCall(API_LIST.GET_TOTAL_GUEST_BOOK, parameters);
            if (result.status) {
                totalGuestBook.value =  result.data.map((item) => {
                    const childComment = {
                        depth: 2,
                        content: '',
                        writer: '사냥개',
                        password: '',
                    }
                    return {...item, childComment};
                });
            }
            totalPages.value = result.pageInfo.totalPages;
            eventBus.emit('to-first-page', 1);
        };

        onMounted(() => {
            loadGuestBook();
        });

        const toggleComments = async (parent) => {
            if (parent.showComments) {
                parent.showComments = false;
                return;
            }            
            const result = await apiCall(API_LIST.GET_GUEST_BOOK_CHILD_COMMENT(parent.id));
            if (result.status) {
                parent.children = result.data;                
            }

            parent.showComments = true;
        };

        const getRandomDogImageUrl = async () => {
            const openApiResult = await apiCall(OPEN_API_LIST.DOGS);
            if (openApiResult.status) {
                return openApiResult.message;
            }
            return null;
        };

        const validateComment = (comment) => {
            if (utils.isEmpty(comment.content)) {
                alert('댓글 내용을 작성해주세요');
                return false;
            }
            if (utils.isEmpty(comment.writer)) {
                alert('닉네임을 작성해주세요');
                return false;
            }
            if (utils.isEmpty(comment.password)) {
                alert('비밀번호를 작성해주세요');
                return false;
            }
            return true;
        }

        const writeParentComment = async () => {
            console.log('페코 -> ', parentComment.value);
            
            // parentComment.value.avatarUrl = await getRandomDogImageUrl();            
            // const result = await apiCall(API_LIST.WRITE_GUEST_BOOK_COMMENT, parentComment.value);

            // if (result.status) {
            //     alert('댓글 작성 성공!');
            //     parentComment.value.content = '';

            //     const findExistedChild = (id) => {
            //         const guestBookWithChild = totalGuestBook.value.find((item) => {
            //             return item.id === id && item.showComments;
            //         });
            //         return guestBookWithChild;
            //     }

            //     const newGuestBook = result.data;

            //     newGuestBook.forEach(item => {
            //         const guestBookWithChild = findExistedChild(item.id);
            //         if (guestBookWithChild) {
            //             item.children = guestBookWithChild.children;
            //             item.showComments = guestBookWithChild.showComments;
            //             item.childComment = guestBookWithChild.childComment;
            //         } else {
            //             item.childComment = {
            //                 depth: 2,
            //                 content: '',
            //                 writer: '',
            //                 password: '',
            //             }
            //         }
            //     });

            //     totalGuestBook.value = newGuestBook;
            //     console.log('뉴게북 -> ', newGuestBook);
            // }

            if (!validateComment(parentComment.value)) {
                return false;
            }

            parentComment.value.avatarUrl = await getRandomDogImageUrl();            
            const result = await apiCall(API_LIST.WRITE_GUEST_BOOK_COMMENT, parentComment.value);

            if (result.status) {
                alert('댓글 작성 성공!');
                parentComment.value.content = '';

                eventBus.emit('to-first-page', 1);
            }

        }

        const writeChildComment = async (parent, childComment) => {
            if (!validateComment(childComment)) {
                return false;
            }

            const parameters = {
                parentId: parent.id,
                avatarUrl: await getRandomDogImageUrl(),
                ...childComment
            };

            const result = await apiCall(API_LIST.WRITE_GUEST_BOOK_COMMENT, parameters);
            if (result.status) {
                parent.children = result.data;
                alert('대댓글 작성 성공!');
            }

            childComment.content = '';
        };

        const onRenewed = (result) => {
            totalGuestBook.value =  result.data.map((item) => {
                const childComment = {
                    depth: 2,
                    content: '',
                    writer: '사냥개',
                    password: '',
                }
                return {...item, childComment};
            });
        };

        watch(orderBy, (newValue, oldValue) => {
            console.log('로게북');
            loadGuestBook();
        });


        return {
            momentUtil,
            api,            
            orderBy,
            changeOrderBy,
            totalPages,
            onRenewed,            
            parentComment,
            totalGuestBook,
            toggleComments,
            writeParentComment,   
            writeChildComment,
            addLikes,
            addDislikes
        }
    },
}
</script>

<style scoped>
    .word-wrapper {
        word-wrap: break-word
    }

    .reply-box {
        font-size: 0.75rem; 
        color: gray;
    }

    .active {
        background-color: #1976d2 !important;
        color: #fff
    }
    
</style>