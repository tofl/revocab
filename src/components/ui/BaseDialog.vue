<template>
  <teleport to="html">
    <!-- Backdrop -->
    <div
      v-if="show"
      @click="$emit('close')"
      class="flex flex-col justify-center fixed top-0 left-0 w-screen h-screen bg-black/50"
    />

    <dialog
      open
      class="top-1/2 -translate-y-1/2 p-5 fixed rounded-sm"
      v-if="show"
    >
      <div class="flex justify-between mb-4">
        <slot name="title"></slot>
        <p
          @click="$emit('close')"
          class="cursor-pointer"
        >
          x
        </p>
      </div>
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
  title: String,
});

defineEmits(['close']);
</script>