<script setup lang="ts">
import CreateUser from "./components/CreateUser.vue";
import UserList from "./components/UserList.vue";
import UsersHeader from "./components/UsersHeader.vue";
</script>

<template>
  <UsersHeader />
  <CreateUser />

  <UserList />
</template>
<style>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap");

body {
  font-family: "Rubik", sans-serif;
}
</style>
