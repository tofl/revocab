<template>
  <button
    class="bg-main-blue px-1.5 h-8 active:translate-y-0.5 text-xl rounded-sm"
    :class="{ 'bg-white': props.type === 'outline', 'border': props.type === 'outline' }"
  >
    <slot></slot>
  </button>
</template>

<script setup>
const props = defineProps({
  type: {
    required: false,
    default: 'default',
  },
});
</script>