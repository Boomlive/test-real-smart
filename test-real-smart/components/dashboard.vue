<template>
  <div>
    <div
      class="flex h-screen items-center justify-center bg-[url('https://images.unsplash.com/photo-1719937206220-f7c76cc23d78?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]"
    >
      <div
        class="text-white h-screen w-screen text-center sm:h-auto sm:w-auto flex flex-col justify-center items-center px-14 py-16 bg-black bg-opacity-90"
      >
        <p>Welcome {{ userStore.getUser }} to dashboard</p>
        <button @click="logout" class="rounded bg-red-500 mt-10 p-2 w-[200px]">
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({
  title: "DashBoard",
});

import { useUserStore } from "~/stores/user";
const userStore = useUserStore();

const router = useRouter();

const logout = () => {
  localStorage.removeItem("access_token");
  userStore.logout();

  router.push("/");
};
</script>

<style lang="scss" scoped>
</style>