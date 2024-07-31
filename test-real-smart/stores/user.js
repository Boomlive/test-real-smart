import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),
  actions: {
    setUser(user) {
      this.user = user;
    },
    clearUser() {
      this.user = null;
    },
    login(user) {
      this.setUser(user);
    },
    logout() {
      this.clearUser();
    },
  },
  getters: {
    getUser: (state) => state.user,
  },
});
