<template>
  <main>
    <div class="relative bg-white my-2">
      <div
        class="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-3xl lg:px-8"
      >
        <div class="mt-2">
          <div class="grid grid-cols-1 gap-4 mb-8">
            <div v-if="error">{{ error }}</div>
            <div v-if="loader" class="flex justify-center items-center">
              <div
                class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"
              ></div>
            </div>
            <div v-for="(user, index) in users" :key="index" class="pt-6">
              <div
                class="rounded-lg bg-white px-6 py-8 border-2 border-gray-100 shadow-md"
              >
                <div class="flex justify-end">
                  <div class="flex justify-between w-1/2">
                    <div class="text-lg font-medium">User {{ user.id }}</div>
                    <div>
                      <svg
                        class="w-5 h-5 hover:cursor-pointer hover:text-red-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        @click="deleteUser(user.id)"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div class="mt-2">
                  <div class="flex justify-between mx-20">
                    <div>Name</div>
                    <div>{{ user.first_name + " " + user.last_name }}</div>
                  </div>
                  <div class="flex justify-between mx-20 mt-5">
                    <div>Color</div>
                    <div>{{ user?.color ? user.color : "--" }}</div>
                  </div>

                  <button
                    class="mt-5 text-sm font-medium tracking-tight text-white py-2 px-5 bg-lime-600 hover:bg-lime-700 border-transparent border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-600"
                    @click="generateRandomHexColorCode(user.id)"
                  >
                    Generate Color
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useUsersStore } from "@/stores/users";
import { storeToRefs } from "pinia";
import type User from "@/interfaces/users";

export default {
  name: "UserList",

  setup() {
    const usersStore = useUsersStore();
    const { users } = storeToRefs(usersStore);
    const error = ref(null);
    const loader = ref(false);
    const deleteUser = async (id: number) => {
      const userArray = users.value.filter((user: User) => user.id !== id);
      usersStore.setUsers(userArray);
    };
    const generateRandomHexColorCode = (id: number) => {
      const randomColor =
        "#" + Math.floor(Math.random() * 16777215).toString(16);

      usersStore.setUsers(
        users.value.map((user: User) => {
          if (user.id === id) {
            return {
              ...user,
              color: randomColor,
            };
          }
          return user;
        })
      );
    };
    const fetchUsers = async () => {
      loader.value = true;
      try {
        const { data } = await axios.get(
          "https://reqres.in/api/users?per_page=5"
        );
        usersStore.setUsers(await data.data);
        users.value = usersStore.users;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        error.value = err.message;
      }
      loader.value = false;
    };
    fetchUsers();

    return {
      users,
      usersStore,
      error,
      deleteUser,
      generateRandomHexColorCode,
    };
  },
};
</script>
