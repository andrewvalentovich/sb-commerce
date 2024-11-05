<template>
    <swiper
        v-if="itemsData"
        :modules="[Navigation, Pagination]"
        :navigation="{
                        prevEl: swiperPrev,
                        nextEl: swiperNext,
                    }"
        :pagination="{
                        type: 'bullets',
                        el: swiperPagination,
                        clickable: true,
                    }"
        class="w-full"
        v-bind="$attrs"
    >
        <swiper-slide v-for="item in itemsData" class="">
            <slot name="item" :item="item" />
        </swiper-slide>


        <div ref="swiperPagination" class="pt-3 flex gap-1 justify-center items-center"></div>
        <div v-if="itemsData.length > 1" ref="swiperPrev" class="group shadow-lg border border-gray-200 absolute top-[50%] left-2 translate-y-[-50%] p-2 w-10 h-10 rounded-full bg-white z-10 transition-all transition-duration-[.3s]">
            <svg class="group-hover:fill-blue-700 fill-gray-700" style="transform: scale(-1, -1);" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </div>
        <div v-if="itemsData.length > 1" ref="swiperNext" class="group shadow-lg border border-gray-200 absolute top-[50%] right-2 translate-y-[-50%] p-2 w-10 h-10 rounded-full bg-white z-10 transition-all transition-duration-[.3s]">
            <svg class="group-hover:fill-blue-700 fill-gray-700" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </div>
    </swiper>
    <p v-else>Нет медиа</p>
</template>

<script setup lang="ts">
import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'

defineProps({
    itemsData: {
        type: Array,
        default: []
    }
})

const swiperPrev = ref(null)
const swiperNext = ref(null)
const swiperPagination = ref(null)
</script>
