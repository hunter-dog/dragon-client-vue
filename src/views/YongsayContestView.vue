<script setup>
    import YongsayContest from '@/components/YongsayContest.vue'
    import YongsayContestResult from '@/components/YongsayContestResult.vue'

</script>

<template>
    <main>        
        <YongsayContest v-if="!isContestFinished"
            @finish-contest="handleFinishContest">
        </YongsayContest>
        <YongsayContestResult v-else
            :winningResult="winningResult"
            @restart="restartContest">
        </YongsayContestResult>        
    </main>
</template>

<script>
    export default {
        data() {
            return {
                isContestFinished: false,
                winningResult: {},
            }
        },
        mounted() {
        },
        methods: {
            handleFinishContest(winningResult) {
                this.winningResult = winningResult;
                this.isContestFinished = true;
            },
            restartContest() {
                this.isContestFinished = false;
            }
            
        }
    }
</script>