<template>
  <!-- display view -->
  <li
    v-if="
      !isEditing &&
      payload.journal.foods &&
      payload.journal.feedback &&
      payload.journal.tags
    "
    class="list-group-item card"
  >
    <div class="card__header">
      <h2 style="vertical-align: middle">
        <i class=""></i>
        <span style="vertical-align: middle">
          {{ payload.journal.title }}
        </span>
      </h2>
      <div>
        <p style="text-align: start">
          <span
            class="text-muted mr-1"
            style="font-size: 8px; display: block; text-align: start"
          >
            時間: {{ payload.journal.date }}
          </span>
          <span
            class="text-muted mr-1"
            style="font-size: 8px; display: block; text-align: start"
          >
            活動: {{ payload.journal.activity }}
          </span>
          <span
            class="text-muted mr-1"
            style="font-size: 8px; display: block; text-align: start"
            v-if="payload.journal.participants"
          >
            人數: {{ payload.journal.participants }} 人
          </span>
          <span
            class="text-muted mr-1"
            style="font-size: 8px; display: block; text-align: start"
            v-if="payload.journal.expense"
          >
            消費:
            <mark style="background-color: yellow"
              >NTD ${{ payload.journal.expense }}
            </mark>
          </span>
        </p>
        <p v-if="payload.journal.tags.length">
          <span
            class="badge rounded-pill bg-secondary"
            style="color: black"
            v-for="tag in payload.journal.tags"
            :key="tag.id"
          >
            {{ tag }}
          </span>
        </p>
      </div>
    </div>
    <div class="card_body">
      <h3 style="text-align: start; margin-top: 3rem">當天菜單:</h3>
      <p>
        <ul class="list-group" v-if="payload.journal.foods.length">
             <li class="list-group-item" v-for="food in payload.journal.foods" :key="food.id">{{food}}</li>
          </ul>
      </p>
    </div>

    <div class="btn-wrapper">
      <button class="btn btn-outline-primary" @click="afterEditClick()">
        修改
      </button>

      <!--刪除元件 -->
      <button
        type="button"
        class="btn btn-outline-danger"
        data-toggle="modal"
        data-target="#delete"
      >
        刪除
      </button>
      <!-- Modal -->
      <div
        class="modal fade"
        id="delete"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body justify-content-center text-center">
              <h5>
                確定要刪除
                <span class="font-weight-bold"></span> 嗎?
              </h5>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" class="btn btn-danger">確定</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </li>

  <!-- edit view -->
  <li v-else-if="isEditing && payload.journal" class="list-group-item card">
    <div class="card__header">
      <textarea
        class="card__title"
        placeholder="Untitled"
        v-model="payload.journal.title"
      ></textarea>

      <p style="text-align: start">
        <label for="time">時間: </label>
        <input
          name="time"
          class="text-muted mr-1"
          style="font-size: 8px; display: block; text-align: start"
          v-model="payload.journal.date"
        />

        <label for="activity">活動: </label>
        <input
          name="activity"
          class="text-muted mr-1"
          style="font-size: 8px; display: block; text-align: start"
          v-model="payload.journal.activity"
        />

        <label for="participants">人數: </label>
        <input
          name="participants"
          class="text-muted mr-1"
          style="font-size: 8px; display: block; text-align: start"
          v-model="payload.journal.participants"
        />

        <label for="expense"> 消費: </label>

        <input
          name="expense"
          style="
            display: block;
            vertical-align: middle;
            text-align: start;
            font-size: 0.8rem;
          "
          v-model="payload.journal.expense"
        />

        <!-- Todo tags -->
        <span class="badge rounded-pill bg-secondary" style="color: black;" v-for="tag in payload.journal.tags" :key="tag.id">
          {{tag}}
        </span>
      </p>
    </div>
    <div class="card_body">
      <h3 style="text-align: start; margin-top: 3rem">當天菜單:</h3>
      <p>
        <ul class="list-group"  v-if="payload.journal.foods.length">
          <input class="list-group-item" v-for="(food,index) in payload.journal.foods" :key="index" :value="food">
        </ul>
      </p>
    </div>

    <!-- 修改 --}} -->
    <div class="btn-wrapper">
      <button
        type="button"
        class="btn btn-outline-secondary"
        @click="closeEdit"
      >
        取消
      </button>

      <button
        type="button"
        class="btn btn-outline-success"
        @click="afterEditConfirmed"
      >
        確定
      </button>
    </div>
  </li>

  <!-- 這裡是顯示錯誤訊息提式使用者 -->

  <!-- <li class="list-group-item text-center"></li> -->
</template>
<script>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import journalApi from "../../apis/journals/journals";

export default {
  name: "JournalSingle",
  setup(props, context) {
    const router = useRouter();
    const afterEditClick = () => {
      isEditing.value = true;
    };
    const closeEdit = () => {
      isEditing.value = false;
    };

    const payload = reactive({
      journal: {
        title: "",
        date: "",
        activity: "",
        participants: 0,
        expense: 0,
        tags: [],
        foods: [],
        feedback: [],
      },
    });

    payload.journal = { ...props.journal };

    const afterEditConfirmed = async () => {
      const {title, date, activity, participants, expense, tags, foods, feedback} = payload.journal
      const newJournal = {title, date, activity, participants, expense, tags, foods, feedback}
      const res = await journalApi.update(props.journal.id, newJournal);
      const { statusText, data } = res;
      if (statusText === "OK") {
        alert("修改成功");
        payload.journal = { ...payload.journal, ...data };
        closeEdit();
      }
    };

    const isEditing = ref(false);

    return {
      payload,
      afterEditClick,
      isEditing,
      closeEdit,
      afterEditConfirmed,
    };
  },
  props: {
    journal: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  justify-content: center;
}
.card {
  width: 25%;
  min-width: 200px;
  flex-grow: 1;
  margin-left: 1rem;
  margin-top: 1rem;
  border: 1px solid skyblue;
  &__title {
    width: 100%;
  }
}
.btn-wrapper {
  display: flex;
  justify-content: flex-end;
  .btn {
    margin-left: 1rem;
  }
}
</style>
