<script setup lang="ts">
const props = defineProps({
  index: {
    type: Number,
    default: 0
  },
  count: {
    type: Number,
    default: 0
  }
})
const states = [
  { text: '全部訂單', press: 'press-menu-navbar-btn' },
  { text: '待結帳', press: '' },
  { text: '準備中', press: '' },
  { text: '待取餐', press: '' },
  { text: '已完成', press: '' }
]
defineEmits(['toggleMenu'])
</script>

<template>
  <div class="scrollbar overflow-x-auto">
    <ul class="flex shadow-[inset_0_-2px_0_-1px] shadow-neutral-300">
      <template v-for="(state, index) in states" :key="index">
        <li
          :id="state.text"
          class="state-navbar-btn"
          :class="index === props.index ? 'press-state-navbar-btn' : ''"
          @click="$emit('toggleMenu', index)"
        >
          {{ state.text }} <span>{{ props.count }}</span>
        </li>
      </template>
    </ul>
  </div>
</template>

<style scoped>
.state-navbar-btn {
  @apply inline-flex grow items-center justify-center gap-2;
  @apply cursor-pointer px-2.5 py-4 text-center text-h5;
  @apply font-normal text-neutral-300;
}
.state-navbar-btn span {
  @apply inline-flex h-fit min-h-[22px] w-fit min-w-[22px] items-center justify-center;
  @apply rounded-full bg-primary-300 px-1 text-xs font-medium text-neutral-950;
}
.press-state-navbar-btn {
  @apply font-bold text-neutral-950;
  @apply shadow-[inset_0_-6px_0_-3px] shadow-neutral-950;
}
.state-navbar-btn:hover {
  @apply font-bold text-neutral-950;
}
.scrollbar::-webkit-scrollbar {
  /* @apply hidden; */
}
</style>
