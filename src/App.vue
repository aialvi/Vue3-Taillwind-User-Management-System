<script setup lang="ts">
import CreateUser from "./components/CreateUser.vue";
import UserList from "./components/UserList.vue";
import UsersHeader from "./components/UsersHeader.vue";
</script>

<template>
  <UsersHeader />

  <CreateUser />

  <main>
    <UserList />
  </main>
</template>
<style>
* {
  font-family: "Rubik", sans-serif;
}
</style>
