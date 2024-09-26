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
//-----
const props = defineProps<{
  table: number | null
}>()
//router桌號
// 如果需要將 table 存儲到 localStorage
if (props.table) {
  localStorage.setItem('customer_table', String(props.table))
}
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
    <div class="announce">
      <div class="announce_in">
        <div class="marquee_text first">
          <div>摩卡可可新上市 緊來ＢＵＹ咖 ฅ^•ﻌ•^ฅ</div>
          <div>摩卡可可新上市 緊來ＢＵＹ咖 ฅ^•ﻌ•^ฅ</div>
          <div>摩卡可可新上市 緊來ＢＵＹ咖 ฅ^•ﻌ•^ฅ</div>
        </div>
        <div class="marquee_text second">
          <div>摩卡可可新上市 緊來ＢＵＹ咖 ฅ^•ﻌ•^ฅ</div>
          <div>摩卡可可新上市 緊來ＢＵＹ咖 ฅ^•ﻌ•^ฅ</div>
          <div>摩卡可可新上市 緊來ＢＵＹ咖 ฅ^•ﻌ•^ฅ</div>
        </div>
      </div>
    </div>
    <div class="absolute bottom-[10%] z-30">
      <UiButton :btn-style="'style1'" :btn-width="'min-w-60'" :router-name="'menu'">
        查看菜單
      </UiButton>
    </div>
  </div>
</template>
<style scoped>
.announce {
  position: absolute;
  top: 0%;
  left: 0;
  z-index: 30;
  overflow: hidden;
  @apply bg-white py-3 text-sm;
}

.announce .announce_in {
  width: calc(18rem * 3);
  padding-top: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.announce .announce_in .marquee_text {
  display: flex;
  justify-content: space-between;
  justify-content: space-around;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  color: rgba(0, 0, 0, 0);
}

.announce .announce_in .marquee_text > div {
  opacity: 0.9;
  @apply text-black;
}

.announce .announce_in .marquee_text.first {
  animation: scroll 40s linear infinite;
  transform: translateX(100%);
}

.announce .announce_in .marquee_text.first.a1 {
  animation-delay: -5s;
}

.announce .announce_in .marquee_text.second {
  animation: scroll 40s linear infinite;
  animation-delay: -20s;
  transform: translateX(0%);
}

.announce .announce_in .marquee_text.second.a1 {
  animation-delay: -25s;
}

@keyframes scroll {
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(-100%);
  }
}

@keyframes scroll2 {
  from {
    transform: translateX(0%);
  }

  to {
    transform: translateX(-200%);
  }
}
</style>
