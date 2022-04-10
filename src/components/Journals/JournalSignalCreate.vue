<template>
<div class="overlay" @click="closeModal"></div>
      <div class="modal__content" >
        <span class="btn btn-close" @click="closeModal">
        </span>
        <div class="list-group-item card">
           <div class="card__header">
      <h2 style="display: inline; vertical-align: middle">
        <i class=""></i>
        <textarea style="vertical-align: middle" type="text" placeholder="Untitled" v-model="payload.title"></textarea>
      </h2>
      <div>
        <p style=" text-align: start;"> <label for="time" class="text-muted">時間: </label>
        <input
        name="time"
          class="text-muted mr-1"
          placeholder="ie: 2021/12/1" v-model="payload.date"
        ></p>
        <p style=" text-align: start;">
              <label for="activity"  class="text-muted">活動: </label>
        <input name="activity" class="text-muted mr-1" style="font-size: 8px;text-align:start;"  v-model="payload.activity">

        </p>

        <p style=" text-align: start;">
  
          <label for="participants"  class="text-muted">人數: </label>
          <input name="participants" class="text-muted mr-1" style="font-size: 8px;  text-align:start;" v-model="payload.participants">

        </p>

        <p style=" text-align: start;">
                <label for="expense"  class="text-muted"> 消費: </label>

        <input name="expense" style=" vertical-align: middle; text-align: start;font-size: 0.8rem" v-model="payload.expense">

        </p>
              <p style=" text-align: start;">
        <!-- Todo tags -->
        <span class="badge rounded-pill bg-secondary" style="color: black;">
          公司同事
        </span>
        <span class="badge rounded-pill bg-secondary" style="color: black;">
          聚餐
        </span>
      </p>
      </div>
    

          </div>
          <div class="card_body">
        
        <h3 style="text-align:start; margin-top:3rem;">當天餐點:</h3>
        <p>
          <ul class="list-group">
             <input class="list-group-item" v-model="payload.foods">
          </ul>
        </p>
          </div>

         <div class="btn-wrapper">
            <button
              class="btn btn-outline-secondary"
             @click="closeModal"
            >
          取消
            </button>

            <button
             type="button"
              class="btn btn-outline-danger" @click="submitCreate"
           >
              確定
            </button>
         </div>
       </div>
      </div>


</template>

<script setup>
import journalsApi from "../../apis/journals/journals"
import {reactive} from "vue"
import {useRouter} from "vue-router"

const emit = defineEmits(['closeModal', 'appendJournal'])

    const closeModal = () => {
      emit('closeModal')
    }

    const payload = reactive({title: "",
      date: "",
      activity: "",
      participants: null,
      expense: null,
      tags: [],
      foods: [],
      feedback: []})

    const router = useRouter()
    const appendJournalEmit = (payload) => {
    emit('appendJournal', payload)
    }

    const submitCreate = async () => {
      const res = await journalsApi.create(payload)
      const {statusText, data} = res
      if(statusText === 'Created') {
        alert("新增成功")
        appendJournalEmit(payload)
        closeModal()
      }
    }

</script>

 <style lang="scss" scoped>

.overlay{
   position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
    z-index: 1000;
  background-color: rgba(0, 0, 0, .5);
  animation-name: open-modal;
  animation-duration: 0.5s;
}

.modal__content {
  width: 100%;
  height: 100%;
  max-width: fit-content;
  max-height: 80vh;
  padding: 1em;
  background-color: #fff;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, .2), 0 5px 20px 0 rgba(0, 0, 0, .16);
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 1000;
  transform: translate(-50%, -50%);
  overflow-y: scroll;
.card {
  margin-top: 2rem;
  input {
    border:none;
    border-bottom: 1px solid skyblue;
  }
  input:focus,textarea:focus {
    outline: none;
  }
}
}


.btn-close {
  font-size: 1.5rem;
  color: #ccc;
  position: absolute;
  right: 20px;
  top: 10px;
  font-size: 1.5rem;
  color: #ccc;
}

.btn-close:hover,
.btn-close:focus {
  color: black;
  cursor: pointer;
}

@keyframes open-modal {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>