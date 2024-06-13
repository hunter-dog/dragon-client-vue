<template>
    <main>
        <div class="q-pa-md items-start q-gutter-md" style="width: 100%;">
            <div class="q-gutter-y-md">
                <q-card>
                    <q-tabs v-model="currentTab" dense class="text-grey" active-color="primary"
                        indicator-color="primary" align="justify" narrow-indicator
                    >
                        <q-tab :name="1" label="방명록"></q-tab>
                        <!-- <q-tab :name="2" label="건의사항"></q-tab> -->
                    </q-tabs>
                </q-card>
            </div>
        </div>
        <div class="q-pa-md">
            <GuestBook v-if="currentTab === 1"></GuestBook>
            <!-- <GuestFeedback v-if="currentTab === 2"></GuestFeedback> -->
        </div>
    </main>
</template>

<script >
import GuestBook from '@/components/GuestBook.vue';
import GuestFeedback from '@/components/GuestFeedback.vue';

import { ref } from 'vue';

export default {
    components: {
        GuestBook,
        GuestFeedback        
    },
    setup() {
        const currentTab = ref(1);
        
        return {
            currentTab,
        }
    },
}
</script>
