<template>
  <JournalList :journals="store.journals" />
  <!-- 這裡是新增日記 -->
  <JournalSignalCreate
    v-if="showCreateJournalModal"
    @closeModal="closeModal"
    @appendJournal="appendJournal"
  />
  <button
    class="btn btn btn-outline-success"
    style="width: 50%"
    @click.stop.prevent="afterCreateClicked"
  >
    <span class="text-center">新增日記</span>
  </button>
</template>

<script setup>
import JournalList from "../Journals/JournalList.vue";
import JournalSignalCreate from "./JournalSignalCreate.vue";
import { ref, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import journalApi from "../../apis/journals/journals";

const store = reactive({ journals: [] });

    onMounted(async () => {
      const res = await journalApi.getAll();
      const { data, statusText } = res;
      if (statusText === "OK") {
        store.journals = [...data];
      }
    });

    const showCreateJournalModal = ref(false);
    const router = useRouter();

    const afterCreateClicked = () => {
      showCreateJournalModal.value = true;
      router.replace("/journals/create");
    };

    const closeModal = () => {
      showCreateJournalModal.value = false;
      router.push("/");
    };

    const appendJournal = (payload) => {
      store.journals.push({...payload});
    };

</script>

