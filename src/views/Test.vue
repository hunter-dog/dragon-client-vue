<template>
    <div class="q-pa-md">        
        <div class="row wrap justify-end  ">
            <q-btn                   
                color="standard" 
                text-color="black"
                label="무작위 용익 응시"
                @click="takeExamRandomly"
            />
            <q-btn                   
                color="standard" 
                text-color="black"
                label="출제하기"                
                @click="moveToCreateForm"
            />
        </div>

        <q-table style="height: 500px" flat bordered title="용익 시험 목록" 
            :rows="rows" 
            :columns="columns" 
            row-key="index"
            virtual-scroll 
            v-model:pagination="pagination" 
            :rows-per-page-options="[0]" 
            @row-click="moveToExam"
        />
    </div>
</template>
  
<script>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { apiCall } from '@/util/apiCall.js';
import { API_LIST } from '@/constants/apiList.js';


const columns = [
    // {
    //     name: 'name',
    //     required: true,
    //     label: 'Dessert (100g serving)',
    //     align: 'left',
    //     field: row => row.name,
    //     format: val => `${val}`,
    //     sortable: true
    // },
    { name: 'examName', align: 'center', label: '용익제목', field: 'examName', sortable: true },
    { name: 'writer', align: 'center', label: '출제자', field: 'writer', sortable: true },
    { name: 'totalQuestionCount', align: 'center', label: '전체 문항', field: 'totalQuestionCount', sortable: true },
    { name: 'take', align: 'center', label: '응시하기', field: 'totalQuestionCount' },


    // { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
    // { name: 'protein', label: 'Protein (g)', field: 'protein' },
    // { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
    // { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
    // { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
]

export default {
    setup() {
        const router = useRouter();
        const rows = ref([]);
        
        onMounted(async () => {
            const result = await apiCall(API_LIST.GET_EXAM_LIST);
            if (result.status) {
                console.log(result.data);
                rows.value = result.data
            }
        });
        
        const moveToExam = (event, row, index) => {
            router.push(`/yongeic/${row.examId}/take`);
        };

        const moveToCreateForm = () => {
            router.push(`/yongeic/generation`);
        }

        const takeExamRandomly = () => {
        }

        return {
            columns,            
            rows,
            moveToExam,
            moveToCreateForm,
            takeExamRandomly,
            pagination: ref({
                rowsPerPage: 0
            })
        }
    }
}
</script>
  
