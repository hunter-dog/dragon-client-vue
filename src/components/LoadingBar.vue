<template>
    <div class="q-pa-md">
    </div>
</template>
  
<script>
import { useQuasar } from 'quasar'
import { watch, onBeforeUnmount, onUpdated } from 'vue';

export default {
    props: {
        isLoading: {
            type: Boolean,
            default: false,
        }
    },
    setup(props) {
        const $q = useQuasar();

        // onUpdated(() => {
        //     if (props.isLoading) {
        //         $q.loading.show();
        //     } else {
        //         $q.loading.hide();
        //     }
        // });
        
        watch(() => props.isLoading, (newValue) => {
            if (newValue) {
                $q.loading.show();
            } else {
                $q.loading.hide();
            }
        });

        // 컴포넌트가 언마운트되기 전에 로딩 인디케이터를 숨깁니다.
        onBeforeUnmount(() => {
            $q.loading.hide();
        });

        return {

        }
    },
}
</script>
  