<script setup lang="ts">
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
// import required modules
import { Pagination, Autoplay } from 'swiper/modules'

import UiButton from '@/components/ui/UiButton.vue'
import ImgAd1 from '@/assets/img/carousel/ad1.jpg'
import ImgAd2 from '@/assets/img/carousel/ad2.jpg'
import ImgAd3 from '@/assets/img/carousel/ad3.jpg'

// Swiper modules
const modules = [Pagination, Autoplay]
</script>

<template>
  <div class="flex min-h-screen w-full items-end justify-center bg-cover bg-center">
    <swiper
      :spaceBetween="0"
      :pagination="{
        clickable: true
      }"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false
      }"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide>
        <img :src="ImgAd1" alt="ad1" />
      </swiper-slide>
      <swiper-slide>
        <img :src="ImgAd2" alt="ad2" />
      </swiper-slide>
      <swiper-slide>
        <img :src="ImgAd3" alt="ad3" />
      </swiper-slide>
    </swiper>
    <div class="absolute bottom-[10%] z-30">
      <UiButton :btn-style="'style1'" :btn-width="'min-w-60'" :router-name="'menu'">
        查看菜單
      </UiButton>
    </div>
  </div>
</template>
<style scoped></style>
