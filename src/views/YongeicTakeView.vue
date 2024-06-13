<script setup>
    import YongeicTake from '@/components/YongeicTake.vue'
    import YongeicResult from '@/components/YongeicResult.vue'
</script>

<template>
    <main>
        <YongeicResult v-if="showResult" :result="userResult">
        </YongeicResult>
        <YongeicTake v-else
            @show-result="handleShowResult">
        </YongeicTake>
    </main>
</template>

<script>
    export default {
        data() {
            return {
                showResult: false,
                userResult: null,
            }
        },
        mounted() {
            
        },
        methods: {
            handleShowResult(result) {
                this.userResult = result;
                this.showResult = true;
            }
        }
    }
</script>