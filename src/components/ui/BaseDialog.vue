<template>
  <teleport to="body">
    <!-- Backdrop -->
    <div
      v-if="show"
      @click="$emit('close')"
      class="fixed top-0 left-0 w-screen h-screen bg-black/50"
    />

    <dialog
      open
      class="p-3"
      v-if="show"
    >
      <slot></slot>
    </dialog>
  </teleport>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});

defineEmits(['close']);
</script>