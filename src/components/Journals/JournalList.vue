<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col-12 col-lg-8 mx-auto">
        <form action="/records/category" method="GET">
          <div class="form-group"></div>
          <div class="form-group">
            <select
              name="category"
              id="category"
              class="form-select bg-secondary"
              style="color: black"
            ></select>
          </div>
        </form>

        <h1
          class="font-weight-bolder text-center"
          style="color: darkorange"
        ></h1>
      </div>
    </div>
    <h1>日記列表 <small> 年 / 月 / 週</small></h1>
    <ul class="journal-list">
      <JournalSingle
        v-for="journal in props.journals"
        :key="journal.id"
        :journal="journal"
      />
    </ul>
  </div>
</template>
<script>
import JournalSingle from "./JournalSingle.vue";

export default {
  name: "JournalList",
  components: { JournalSingle },
  setup(props) {
    return {
      props,
    };
  },
  props: {
    journals: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
.journal-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
