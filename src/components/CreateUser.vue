<template>
  <div
    class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8"
    :key="key"
  >
    <div class="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-4 px-4 shadow-md sm:rounded-lg sm:px-10">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 class="mb-8 text-center text-2xl text-gray-900">Create User</h2>
        </div>
        <Form class="space-y-6" @submit="createUser">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div class="mt-1">
              <Field
                :rules="validateName"
                id="name"
                name="name"
                type="text"
                v-model="user.name"
                autocomplete="name"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 bg-gray-50 focus:bg-gray-100 sm:text-sm"
              />
              <ErrorMessage name="name" class="text-red-500" as="p" />
            </div>
          </div>
          <div>
            <label for="job" class="block text-sm font-medium text-gray-700">
              Job
            </label>
            <div class="mt-1">
              <Field
                :rules="validateJob"
                id="job"
                name="job"
                type="text"
                v-model="user.job"
                autocomplete="job"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 bg-gray-50 focus:bg-gray-100 sm:text-sm"
              />
              <ErrorMessage name="job" class="text-red-500" as="p" />
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-lime-600 hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
              :disabled="user.job === '' || user.name === ''"
              :class="{
                'cursor-not-allowed': user.job === '' || user.name === '',
              }"
            >
              Submit
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ref } from "vue";
import axios from "axios";
import { Form, Field, ErrorMessage } from "vee-validate";
import { useUsersStore } from "@/stores/users";

export default defineComponent({
  name: "CreateUser",
  components: {
    Field,
    // eslint-disable-next-line vue/no-reserved-component-names
    Form,
    ErrorMessage,
  },
  setup() {
    const key = ref(0);
    const user = ref({
      name: "",
      job: "",
    });
    const usersStore = useUsersStore();

    const setJob = (job: string) => {
      user.value.job = job;
    };

    const setName = (name: string) => {
      user.value.name = name;
    };

    const changeKey = () => {
      key.value++;
    };

    const clearUser = () => {
      (user.value.job = ""), (user.value.name = "");
    };

    const validateName = (name: string) => {
      if (!name) {
        return "This field is required";
      }
      if (name.length > 15 || name.length < 5) {
        return "Name must be between 5 and 15 characters";
      }
      if (name && !name.match(/^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$/)) {
        return "This field must be alphabetic";
      }
      return true;
    };
    const validateJob = (job: string) => {
      if (!job) {
        return "This field is required";
      }
      if (job.length > 15 || job.length < 5) {
        return "Job must be between 5 and 15 characters";
      }
      if (job && job.length > 15) {
        return "This field is too short";
      }
      if (job && !job.match(/^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$/)) {
        return "This field must be alphabetic";
      }
      return true;
    };
    const createUser = async () => {
      try {
        const { data } = await axios.post("https://reqres.in/api/users", {
          name: user.value.name,
          job: user.value.job,
        });
        const newUser = {
          id: data.id,
          first_name: data.name.split(" ")[0],
          last_name: data.name.split(" ")[1] || "",
          job: data.job,
        };
        usersStore.addUser(newUser);
      } catch (err: any) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        this.$alert("Error creating user", "Error", {
          type: "error",
        });
      } finally {
        clearUser();
        changeKey();
      }
    };

    return {
      user,
      key,
      createUser,
      validateName,
      validateJob,
      setName,
      setJob,
    };
  },
});
</script>
