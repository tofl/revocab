<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    type="text"
    class="border rounded-sm w-52 h-8 px-2 relative bottom-0.5"
    :placeholder="placeholder"
  />
</template>

<script setup>
defineProps({
  placeholder: String,
  modelValue: String,
})
defineEmits(['update:modelValue'])
</script>