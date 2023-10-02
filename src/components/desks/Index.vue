<template>
  <div class="container">
    <form>
      <div class="form-group">
        <label for="namein" class="label-group">Name Desk</label>
        <input
          type="text"
          id="namein"
          class="form-control my-3"
          v-model="name"
          required
        />
        <div v-if="errorMessage" class="text-danger">
          {{ errorMessage }}
        </div>
      </div>
      <button type="submit" @click.prevent="addDesk" class="btn btn-primary my-3">
        Add Desk
      </button>
    </form>
    <div class="d-flex justify-content-center" v-if="isLoading">
      <div class="text-center spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <h2 class="text-primary">Loading...</h2>
    </div>
    <div class="row">
      <div class="col-lg-4" v-for="desk in desks">
        <div class="card mt-3">
          <router-link
            :to="{ name: 'show', params: { deskId: desk.id } }"
            class="card-body"
          >
            <h5 class="card-title text-center">{{ desk.name }}</h5>
          </router-link>
          <button type="button" class="btn btn-danger" @click="deleteDesk(desk.id)">
            Delete
          </button>
        </div>
      </div>
    </div>
    <div class="mt-4 d-flex justify-content-center align-items-center" v-if="!isLoading">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <!-- <li class="page-item">
                        <a class="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li> -->
          <li
            class="page-item d-flex"
            style="cursor: pointer"
            :class="{ active: pageNumber == page }"
            v-for="pageNumber in pageNumbers"
            :key="pageNumber"
            @click="changePage(pageNumber)"
          >
            <span class="page-link">{{ pageNumber }}</span>
          </li>
          <!-- <li class="page-item">
                        <a class="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li> -->
        </ul>
      </nav>
    </div>
    <div class="alert alert-danger" role="alert" v-if="errored">error loading data</div>
  </div>
</template>
<script>
import axios from "@/service/axios";
export default {
  name: "Index",
  data() {
    return {
      name: "",
      desks: [],
      errored: false,
      isLoading: false,
      errorMessage: null,
      page: 1,
      pageNumbers: 0,
    };
  },
  mounted() {
    this.getDesks();
  },
  methods: {
    async getDesks() {
      this.isLoading = true;
      await axios.get("/desks", {
          params: {
            page: this.page,
          },
        })
        .then((response) => {
          this.desks = response.data.data;
          this.pageNumbers = response.data.info;
          this.isLoading = false;
          console.log(response);
        })
        .catch((error) => {
          this.errored = true;
          this.isLoading = false;
        });
    },
    deleteDesk(id) {
      if (confirm("Are you sure you want to delete")) {
        this.isLoading = true
        axios
          .post(`/desks/${id}`, {
            _method: "DELETE",
          })
          .then((response) => {
            alert(response.data.message);
            this.isLoading = false
          })
          .catch((error) => {
            console.log(error);
            alert("desk don`t delete something went wrong!");
          })
          .finally(() => {
            this.isLoading = false
            this.getDesks();
          });
      }
    },
    changePage(page){
        this.page = page
        this.getDesks()
    },
    addDesk() {
      this.isLoading = true;
      axios
        .post("/desks", { name: this.name })
        .then((response) => {
          alert(response.data.message);
          this.name = "";
          this.getDesks();
        })
        .catch((error) => {
          this.isLoading = false;
          this.errorMessage = error.response.data.message;
        })
        .finally((event) => {
          setTimeout(() => {
            this.errorMessage = false;
          }, 5000);
        });
    },
  },
};
</script>
<style></style>
