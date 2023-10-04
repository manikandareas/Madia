<template>
  <HLDialog :open="isOpen" @close="$emit('handleModal')">
    <HLDialogPanel>
      <HLDialogTitle>Successfully Uploading Cover image </HLDialogTitle>
      <HLDialogDescription>
        This will permanently deactivate your account
      </HLDialogDescription>

      <p>
        Are you sure you want to deactivate your account? All of your data will
        be permanently removed. This action cannot be undone.
      </p>

      <button @click="$emit('handleModal')">Deactivate</button>
      <button @click="$emit('handleModal')">Cancel</button>
    </HLDialogPanel>
  </HLDialog>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});
</script>
