<script setup>
    import youtube from '@/assets/img/youtube.png';
    import insta from '@/assets/img/insta.png';

</script>

<template>
    <!-- <div class="q-pa-md example-row-equal-width">
        <h4>네오황제신께서 줘 패버린 사람들</h4>
        <div class="row" v-for="(chunk, index) in chunkedCards" :key="index">
            <div class="col q-pa-md" v-for="person in chunk" :key="person.id">
                <q-card class="my-card" v-bind:class="{ 'invisible': person.id === -1 }">
                    <q-item>
                        <q-item-section avatar>
                            <q-avatar>
                                <img :src="person.logoUrl" alt="logo">
                            </q-avatar>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>{{ person.name }}</q-item-label>
                            <q-item-label caption>{{ person.speciality }}</q-item-label>
                        </q-item-section>

                        <q-item-label>
                            <a :href="person.snsUrl" target="_blank">
                                <img width="30px" :src="youtube">
                            </a>
                        </q-item-label>
                    </q-item>

                    <img :src="person.thumbnailUrl" alt="대표이미지가 없습니다.">

                    <q-card-actions class="space-evenly">
                        <q-btn flat @click="addLikes(person.id)">
                            <div>
                                <q-icon name="thumb_up" color="blue" /><br>
                                <span>개추</span><br>                      
                                <span>({{ person.likes }})</span>      
                            </div>
                        </q-btn>
                        
                        <q-btn flat @click="addDislikes(person.id)">
                            <div>
                                <q-icon name="thumb_down" color="red" /><br>
                                <span>비추</span><br>
                                <span>({{ person.dislikes }})</span>                                
                            </div>
                        </q-btn>
                    </q-card-actions>
                </q-card>
            </div>
        </div>
    </div> -->

    <div class="q-pa-md example-row-equal-width">
        <span class="q-pa-md font-big">🐉 드래곤 니체의 재림 대찬우 연합 🐉</span>
        <div class="row">
            <div v-bind:class="dynamicColumn + ' q-pa-md'" v-for="person in teamDaragon" :key="person.id">
                <q-card class="my-card" v-bind:class="{ 'invisible': person.id === -1 }">
                    <q-item>
                        <q-item-section avatar>
                            <q-avatar>
                                <img :src="person.logoUrl" alt="logo">
                            </q-avatar>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>{{ person.name }}</q-item-label>
                            <q-item-label caption>{{ person.speciality }}</q-item-label>
                        </q-item-section>

                        <q-item-label>
                            <a :href="person.snsUrl" target="_blank">
                                <img width="30px" :src="youtube">    
                            </a>
                        </q-item-label>
                    </q-item>

                    <img :src="person.thumbnailUrl" alt="대표이미지가 없습니다.">

                    <q-card-actions class="space-evenly">
                        <q-btn flat @click="addLikes(person.id)">
                            <div>
                                <q-icon name="thumb_up" color="blue" /><br>
                                <span>개추</span><br>                      
                                <span>({{ person.likes }})</span>      
                            </div>
                        </q-btn>
                        
                        <q-btn flat @click="addDislikes(person.id)">
                            <div>
                                <q-icon name="thumb_down" color="red" /><br>
                                <span>비추</span><br>
                                <span>({{ person.dislikes }})</span>                                
                            </div>
                        </q-btn>
                    </q-card-actions>
                </q-card>
            </div>
        </div>

    
        <span class="q-pa-md font-big">🧍 네오황제신과 접촉이 있었던 NPC 명부 🧍</span>
        <div class="row">
            <div v-bind:class="dynamicColumn + ' q-pa-md'" v-for="person in yongniverse" :key="person.id">
                <q-card class="my-card" v-bind:class="{ 'invisible': person.id === -1 }">
                    <q-item>
                        <q-item-section avatar>
                            <q-avatar>
                                <img :src="person.logoUrl" alt="logo">
                            </q-avatar>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>{{ person.name }}</q-item-label>
                            <q-item-label caption>{{ person.speciality }}</q-item-label>
                        </q-item-section>

                        <q-item-label>
                            <a :href="person.snsUrl" target="_blank">
                                <template v-if="person.snsUrl.includes('youtube')">
                                    <img width="30px" :src="youtube">    
                                </template>
                                <template v-if="person.snsUrl.includes('insta')">
                                    <img width="30px" :src="insta">    
                                </template>
                            </a>
                        </q-item-label>
                    </q-item>

                    <img :src="person.thumbnailUrl" alt="대표이미지가 없습니다.">

                    <q-card-actions class="space-evenly">
                        <q-btn flat @click="addLikes(person.id)">
                            <div>
                                <q-icon name="thumb_up" color="blue" /><br>
                                <span>개추</span><br>                      
                                <span>({{ person.likes }})</span>      
                            </div>
                        </q-btn>
                        
                        <q-btn flat @click="addDislikes(person.id)">
                            <div>
                                <q-icon name="thumb_down" color="red" /><br>
                                <span>비추</span><br>
                                <span>({{ person.dislikes }})</span>                                
                            </div>
                        </q-btn>
                    </q-card-actions>
                </q-card>
            </div>
        </div>
    </div>

</template>

<script>
    import {apiCall} from '@/util/apiCall.js';
    import { API_LIST } from '@/constants/apiList.js';

    export default {
        data() {
            return {
                yongniverse: [],
                teamDaragon: [],
                windowWidth: window.innerWidth,
            }
        },
        mounted() {
            this.getYongniverse();
            window.addEventListener('resize', this.handleResize);
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.handleResize);
        },
        methods: {
            handleResize() {
                this.windowWidth = window.innerWidth;
            },
            getYongniverse() {            
                this.getNpcList();
                this.getTeamDragon();
            },
            async getNpcList() {
                const result = await apiCall(API_LIST.GET_YONGNIVERSE);
                if (result.status) {
                    this.yongniverse = result.data;
                }
            },
            async getTeamDragon() {
                const result = await apiCall(API_LIST.GET_YONGNIVERSE_TEAM_DRAGON);
                if (result.status) {
                    this.teamDaragon = result.data;
                }
            },
            async addLikes(id) {
                const parameters = {
                    isLike: true,
                    id,
                    tableName: 'yongniverse'
                };

                const result = await apiCall(API_LIST.ADD_YONGNIVERSE_LIKES, parameters); 
                if (result.status) {

                    let person = this.yongniverse.find((person) => {
                        return person.id === id;
                    });
                    if (!person) {
                        person = this.teamDaragon.find((person) => {
                            return person.id === id;
                        });
                    }
                    person.likes = result.data.likes;
                } else {
                    alert(result.message);
                }
            },
            async addDislikes(id) {
                const parameters = {
                    isLike: false,
                    id,
                    tableName: 'yongniverse'
                };

                const result = await apiCall(API_LIST.ADD_YONGNIVERSE_DISLIKES, parameters); 
                if (result.status) {
                    let person = this.yongniverse.find((person) => {
                        return person.id === id;
                    });
                    if (!person) {
                        person = this.teamDaragon.find((person) => {
                            return person.id === id;
                        });
                    }
                    person.dislikes = result.data.dislikes;
                } else {
                    alert(result.message);
                }

                

            }
        },
        computed: {
            chunkedCards() {
                let chunks = [];
                for (let i = 0; i < this.yongniverse.length; i += 5) {
                    const newChunk = this.yongniverse.slice(i, i + 5);
                    if (newChunk.length < 5) {
                        const countOfFakeCards = 5 - newChunk.length;
                        for (let i=0; i < countOfFakeCards; i++) {
                            const fakeCard = {
                                id: -1,
                            }
                            newChunk.push(fakeCard);
                        }
                    }
                    chunks.push(newChunk);
                }
                return chunks;
            },
            dynamicColumn() {
                if (this.windowWidth >= 1200) {
                    return 'col-3';
                } else if (this.windowWidth >= 992) {
                    return 'col-4';
                } else if (this.windowWidth >= 768) {
                    return 'col-6';
                } else {
                    return 'col-12';
                }
            },
           
        }
    }
</script>

<style scoped>
    .space-evenly {
        justify-content: space-evenly;
    }

    .font-big {
        font-size: 25px;   
    }
</style>