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
body {
  font-family: "Rubik", sans-serif;
}
</style>
