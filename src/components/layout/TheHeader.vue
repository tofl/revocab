<template>
  <header class="h-14 px-10 bg-main-blue">
    <div class="container flex justify-between items-center h-full">
      <div>
        <RouterLink
          to="/"
          class="font-light text-lg"
        >
          Revocab
        </RouterLink>
      </div>

      <div>
        <BaseButton
          @click="saveStore"
          type="outline"
        >
          Save
        </BaseButton>

        <BaseButton
          type="outline"
          class="ml-3"
          @click="showImportDialog = true"
        >
          Import
        </BaseButton>

        <BaseDialog
          :show="showImportDialog"
          @close="showImportDialog = false"
        >
            <template #title>
              <div>
                <p class="text-2xl">Import a file</p>
                <p class="mb-4">You can import your previously saved words using the simple form below.</p>
              </div>
            </template>

            <template #default>
              <form>
                <div class="flex">
                  <input
                    type="file"
                    ref="fileUploader"
                    @change="handleFile"
                  />
                  <p v-if="uploadIsDone">
                    Successfully uploaded
                  </p>
                </div>
              </form>
            </template>
        </BaseDialog>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import BaseDialog from '@/components/ui/BaseDialog.vue';
import { useLanguagesStore } from '@/stores/languages';
import BaseButton from '@/components/ui/BaseButton.vue';

const languagesStore = useLanguagesStore();

async function saveStore() {
  const blob = new Blob([JSON.stringify(languagesStore.data)], { type: 'text/plain' });
  const a = document.createElement('a');
  a.download = 'revocab.json';
  a.href = window.URL.createObjectURL(blob);
  a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
  a.click();
}

const showImportDialog = ref(false);
const uploadIsDone = ref(false);

function handleFile(e) {
  const reader = new FileReader();
  reader.onload = () => {
    languagesStore.$patch({ data: JSON.parse(reader.result) });
    localStorage.setItem('data', reader.result);
    uploadIsDone.value = true;
  };

  reader.readAsText(e.target.files[0]);
}
</script>