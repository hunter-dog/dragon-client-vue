<!-- <script setup>
    import LoadingBar from '@/components/LoadingBar.vue';
    import YongsaySubmitForm from '@/components/YongsaySubmitForm.vue'
</script>

<template>
    <main>
        <LoadingBar :isLoading="isLoading"></LoadingBar>
        <YongsaySubmitForm 
            @toggle-loading-bar="handleLoadingEvent">
        </YongsaySubmitForm>
    </main>
</template>

<script>

export default {
    data() {
        return {
            isLoading: false,
        }
    },
    methods: {
        handleLoadingEvent(toggleValue) {
            this.isLoading = toggleValue;
        }
    }
}

</script> -->

<script setup>
    import YongsaySubmitForm from '@/components/YongsaySubmitForm.vue'
</script>

<template>
    <main>
        <YongsaySubmitForm></YongsaySubmitForm>
    </main>
</template>

