<template>
    <div class="q-pa-lg flex flex-center">
        <q-pagination
            v-model="current"
            :max="totalPages"
            max-pages="10"
            @update:model-value="changePage"
            direction-links
            boundary-links
            icon-first="skip_previous"
            icon-last="skip_next"
            icon-prev="fast_rewind"
            icon-next="fast_forward"
        />
    </div>
</template>
  
<script>
    import { ref, onMounted, onUnmounted } from 'vue'
    import { apiCall } from '@/util/apiCall.js';
    import { eventBus } from '@/util/eventBus.js';


    export default {
        props: {
            totalPages: Number,
            api: Object,
            parameters: Object,            
        },      
        setup (props, { emit }) {
            const current = ref(1);
            const changePage = async (newPage) => {
                const pagingData = {
                    page: newPage - 1,
                    size: 10,    // #todo 240227: 하드코딩
                };

                const result = await apiCall(props.api, {...pagingData, ...props.parameters});
                emit('renew-data', result);
            };

            const toFirstPage = (firstPage) => {
                current.value = firstPage;
                changePage(firstPage);
            };
            
            onMounted(() => {
                eventBus.on('to-first-page', toFirstPage);
            });

            onUnmounted(() => {
                eventBus.off('to-first-page', toFirstPage);
            });

            return {
                current,
                changePage
            }
        }
    }
</script>
  