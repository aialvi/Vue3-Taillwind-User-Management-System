import type User from "@/interfaces/users";
import { defineStore } from "pinia";

export const useUsersStore = defineStore({
  id: "users",
  state: () => ({
    users: [] as User[],
  }),
  actions: {
    setUsers(users: User[]) {
      this.users = users;
    },

    addUser(user: User) {
      this.users.push(user);
    },
  },
});
