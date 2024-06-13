<!-- todo 240205: 전체 용세이에 대해 통계 볼 수 있는 화면 하나 더 만들어야 함 -->

<script setup>
    import sonny from '@/assets/img/sonny.png';
    import Card from '@/components/YongsayContestCard.vue';
</script>

<template>    
    <div v-show="showModal" class="q-pa-md items-center">
        <div class="q-gutter-y-md column" style="width: 80%;">
            <img class="frame" :src="sonny" alt="쏘니"/>            
            <q-select v-model="tournamentRound" 
                :options="tournamentOptions" 
                :hint="`총 ${totalCountOfYongsays}개의 용say 중 무작위 ${tournamentRound.value}개가 대결합니다.`"
                label="총 라운드를 선택하세요" />

            <q-btn color="white" text-color="black" label="시작하기" @click="getRandomYongsays"></q-btn>            
        </div>
    </div>

    <div class="items-center">
        <h4>{{ roundInfo }}</h4>
    </div>
    <div v-if="yongsayList.length > 0">
        <Card 
            :leftContent="leftYongsay"
            :rightContent="rightYongsay"
            @choose-one="onSelected"
        >
        </Card>
    </div>
</template>

<script>

    import {apiCall} from '@/util/apiCall.js';
    import { API_LIST } from '@/constants/apiList.js';

    export default {
        emits: ['finish-contest'],
        data() {
            return {
                showModal: true,
                totalCountOfYongsays: 0,
                yongsayList: [],
                leftYongsay: {},
                rightYongsay: {},
                index: 0,
                selectedIds: [],
                tournamentOptions: [
                    { label: '8강', value: 8 }, 
                    { label: '4강', value: 4 }
                ],
                tournamentRound: { label: '8강', value: 8 },
                round: 1,
                endOfRound: undefined,
                rounds: {
                    2: '🐉결승전🐉',
                    4: '준결승전',
                    8: '8강',
                    16: '16강',
                    32: '32강' 
                },
                roundInfo: ''
            }
        },
        mounted() {    
            this.getTotalCountOfYongsays();
        },
        methods: {
            async getTotalCountOfYongsays() {
                const result = await apiCall(API_LIST.GET_TOTAL_COUNT_OF_YONGSAYS);
                if (result.status) { 
                    this.totalCountOfYongsays = result.data;
                }
            },
            async getRandomYongsays() {
                this.showModal = false;
                this.endOfRound = this.findPowerOfTwo(this.tournamentRound.value) + 1;

                const result = await apiCall(API_LIST.GET_RANDOM_YONGSAYS, {count: this.tournamentRound.value});
                if (result.status) {
                    this.yongsayList = result.data;
                    this.startRound();
                }
            },
            startRound() {
                console.log('라운드' + this.round + ' 스타트!!');
                console.log('토너먼트 -> ', this.tournamentRound)

                const currentRound = Math.pow(2, this.findPowerOfTwo(this.tournamentRound.value) - this.round + 1);
                this.roundInfo = this.rounds[currentRound];
                console.log('커라 -> ', this.rounds[currentRound]);

                this.leftYongsay = this.yongsayList[this.index];
                this.rightYongsay = this.yongsayList[this.index + 1];
            },
            shuffleArray(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    // 0과 i 사이의 무작위 인덱스를 선택
                    const j = Math.floor(Math.random() * (i + 1));
                    // array[i]와 array[j]의 위치를 교환
                    [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
            },
            findPowerOfTwo(number) {
                return Math.log2(number);
            },
            async onSelected(id) {
                console.log(id);
                this.selectedIds.push(id);
                this.index = this.index + 2;
                console.log('인덱스 => ', this.index)

                if (this.index === this.yongsayList.length) {
                    this.round += 1;
                    if (this.round === this.endOfRound) {                        
                        alert('용세이 월드컵 종료!');                
                        const finalItem = this.yongsayList.find((item) => {
                            return item.id === id
                        });

                        const winningStatistics = await apiCall(API_LIST.INCREASE_WINNING_COUNT_OF_YONGSAY_CONTEST(finalItem.id));
                        
                        const winningResult = {
                            finalItem,
                            winningStatistics: winningStatistics.data,                            
                        };

                        this.$emit('finish-contest', winningResult);

                        return;
                    }

                    this.yongsayList = this.yongsayList.filter((item) => {
                        return this.selectedIds.includes(item.id);
                    });
                    this.yongsayList = this.shuffleArray(this.yongsayList);                

                    this.index = 0;
                    this.selectedIds = [];
                    
                    this.startRound();
                } else {
                    this.leftYongsay = this.yongsayList[this.index];
                    this.rightYongsay = this.yongsayList[this.index + 1];
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

.frame {
    padding-top: 30px;
    width: 30%;
    margin: auto;
}

</style>