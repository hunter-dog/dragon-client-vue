<template>
    <div class="q-pa-md">
        <div class="row wrap justify-end  ">
            <q-btn color="standard" text-color="black" label="무작위 용익 응시" @click="takeRandomExam" />
            <q-btn color="standard" text-color="black" label="출제하기" @click="moveToCreateForm" />
        </div>

        <q-table
            class="my-sticky-header-table" 
            table-header-class="my-special-class"
            flat 
            bordered 
            title="[ 전체 용익 시험 목록 ]" 
            :rows="rows" 
            :columns="columns"
            row-key="name" 
            virtual-scroll
            :rows-per-page-options="[0]">

            <template v-slot:header="props">
                <q-tr :props="props">
                    <q-th v-for="col in props.cols" :key="col.name" :props="props">
                        {{ col.label }}
                    </q-th>
                    <q-th auto-width />
                </q-tr>
            </template>

            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td v-for="col in props.cols" :key="col.name" :props="props">                        
                        <span v-if="col.name !== 'examId'">{{ col.value ? col.value : 0}}</span>
                        <div v-else>
                            <q-btn size="md" color="primary" label="응시하기" dense @click="moveToExam(col.value)" />
                            &nbsp;
                            <q-btn size="md" color="secondary" label="결과보기" dense @click="moveToExamStatistic(col.value)" />
                        </div>
                    </q-td>                    
                </q-tr>
            </template>            

        </q-table>
    </div>
</template>
  
<script>

import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { apiCall } from '@/util/apiCall.js';
import { API_LIST } from '@/constants/apiList.js';
import { momentUtil } from '@/util/moment';


const columns = [
    { name: 'examName', align: 'center', label: '시험제목', field: 'examName', sortable: true },
    { name: 'writer', align: 'center', label: '출제자', field: 'writer', sortable: true },
    { name: 'totalQuestionCount', align: 'center', label: '전체 문항', field: 'totalQuestionCount', sortable: true },
    { name: 'countOfTestTaker', align: 'center', label: '총 응시 횟수', field: 'countOfTestTaker', sortable: true },
    { name: 'scorePerfect', align: 'center', label: '만점', field: 'scorePerfect', sortable: true },
    { name: 'avgScoreAcquired', align: 'center', label: '사냥개 평균 점수', field: 'avgScoreAcquired', sortable: true },
    { name: 'createdAt', align: 'center', label: '출제일자', field: 'createdAt', sortable:true },
    { name: 'examId', align: 'center', label: '', field: 'examId' },
]

export default {
    setup() {
        const rows = ref([]);
        const router = useRouter();

        const moveToExam = (examId) => {
            router.push(`/yongeic/${examId}/take`);
        };

        const moveToExamStatistic = (examId) => {
            router.push(`/yongeic/${examId}/statistic`);
        }

        const moveToCreateForm = () => {
            router.push(`/yongeic/generation`);
        };

        const takeRandomExam = () => {
            const randomNumber = Math.floor(Math.random() * rows.value.length);
            const randomExamId = rows.value[randomNumber].examId;
            
            router.push(`/yongeic/${randomExamId}/take`)
        }

        onMounted(async () => {
            const result = await apiCall(API_LIST.GET_EXAM_LIST);
            if (result.status) {
                result.data.forEach((item) => {
                    item.createdAt = momentUtil.getDate(item.createdAt);
                });
                rows.value = result.data
            }
        });

        return {
            columns,
            rows,
            moveToExam,
            moveToCreateForm,
            moveToExamStatistic,
            takeRandomExam
        }
    }
}
</script>
  

<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  height: 600px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #ffffff

  thead tr th
    position: sticky
    z-index: 1
    font-size: 15px
    font-weight: bold
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style>