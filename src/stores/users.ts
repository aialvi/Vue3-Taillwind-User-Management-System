import type User from "@/interfaces/users";
import { defineStore } from "pinia";

export const useUsersStore = defineStore({
  id: "users",
  state: () => ({
    users: [],
  }),
  actions: {
    setUsers(users: User[]) {
      //@ts-ignore
      this.users = users;
    },

    addUser(user: User) {
      //@ts-ignore
      this.users.push(user);
    },
  },
});
