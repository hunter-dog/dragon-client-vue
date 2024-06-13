<template>
    <div class="q-pa-md example-row-equal-width">
        <div class="dynamic-flex row">
            <div class="col first" @click="chooseOne(leftContent.id)">
                <!-- <q-img 
                    :src="`${S3}${leftContent.fileName}`"
                    fit="cover"
                    style="width: 100%"
                >
                    <div class="absolute-top custom-caption">
                        <div class="text-subtitle1" v-dompurify-html="leftContent.content"></div>
                    </div>                
                </q-img> -->
                
                <q-card class="my-card" flat bordered>
                    <q-card-section style="background-color: aliceblue;">
                        <div class="text q-mb-xs" v-dompurify-html="leftContent.content"/>                        
                    </q-card-section>

                    <img :src="`${S3}${leftContent.fileName}`">
                </q-card>

            </div>

            <div class="col" @click="chooseOne(rightContent.id)">
                <!-- <q-img 
                    :src="`${S3}${rightContent.fileName}`"
                    fit="cover"
                    style="width: 100%"
                >
                    <div class="absolute-top custom-caption">
                        <div class="text-subtitle1" v-dompurify-html="rightContent.content"></div>
                    </div>                
                </q-img> -->
                <q-card class="my-card" flat bordered>
                    <q-card-section style="background-color: aliceblue;">
                        <div class="text q-mb-xs" v-dompurify-html="rightContent.content"/>                        
                    </q-card-section>

                    <img :src="`${S3}${rightContent.fileName}`">
                </q-card>

            </div>
        </div>
    </div>
</template>

<script>
import { ref,computed } from 'vue'

export default {
    props: {
        leftContent: Object,
        rightContent: Object,
        imgUrl: String,
    },
    setup(props, context) {
        const windowWidth = ref(window.innerWidth);
        const S3 = ref(import.meta.env.VITE_S3_URL);
        const chooseOne = (id) => {
            context.emit('choose-one', id);
        };

        return {
            S3,
            slide: ref('first'),
            chooseOne,
        }
    }
}
</script>

<style lang="sass" scoped>
.custom-caption
  text-align: center
  padding: 12px
  color: white
  background-color: rgba(0, 0, 0, .3)


</style>

<style scoped>
.dynamic-flex {
    display: block;
}

.dynamic-flex .first {
    margin-bottom: 30px;
}

.dynamic-flex .col {
    cursor: pointer;
}

.dynamic-flex .col:hover {
    opacity: 1;
	-webkit-transition: .5s ease-in-out;
	transition: .5s ease-in-out;
}

.dynamic-flex .col:hover {
    opacity: .7;
}

@media (min-width: 800px) {
  .dynamic-flex {
    display: flex;
    flex-wrap: wrap;
  }

  .dynamic-flex div {
    margin: 0;
  }
}
</style>