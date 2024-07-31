<template>
  <div>
    <div
      class="flex h-screen items-center justify-center bg-[url('https://images.unsplash.com/photo-1719937206220-f7c76cc23d78?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]"
    >
      <form
        @submit.prevent="handleSubmit"
        class="h-screen w-screen sm:h-auto sm:w-auto flex flex-col justify-center px-14 py-16 bg-black bg-opacity-90"
      >
        <div class="py-4">
          <h1 class="text-2xl text-white">Sign In</h1>
        </div>
        <div class="py-4">
          <input
            type="text"
            id="emailOrPhone"
            v-model="emailOrPhone"
            placeholder="Email or phone number"
            class="rounded w-full p-2 pl-4 border-b-4"
            :class="{
              'border-green-400': isValidEmailOrPhone,
              'border-orange-400': !isValidEmailOrPhone,
            }"
          />
          <div>
            <p
              class="ms-1 text-xs pt-2"
              :class="{
                'text-green-400': isValidEmailOrPhone,
                'text-orange-400': !isValidEmailOrPhone,
              }"
            >
              Please enter a valid email or phone number.
            </p>
          </div>
        </div>
        <div class="py-4">
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Password"
            class="rounded w-full p-2 pl-4 border-b-4"
            :class="{
              'border-green-400': isValidPassword,
              'border-orange-400': !isValidPassword,
            }"
          />
          <div>
            <p
              class="ms-1 text-xs pt-2"
              :class="{
                'text-green-400': isValidPassword,
                'text-orange-400': !isValidPassword,
              }"
            >
              Your password must contain between 4 and 60 characters.
            </p>
          </div>
        </div>
        <div class="mt-10">
          <button
            class="px-5 py-2.5 w-full bg-red-600 text-white font-medium rounded text-sm text-center"
            type="submit"
          >
            Sign In
          </button>
        </div>
        <div class="flex justify-between items-center">
          <div class="flex items-center py-2">
            <input
              v-model="rememberActive"
              id="default-checkbox"
              type="checkbox"
              class="w-4 h-4 bg-gray-600"
            />
            <label for="default-checkbox" class="ms-2 text-xs text-gray-400"
              >Remember me
            </label>
          </div>
          <div>
            <a href="" class="text-xs text-gray-400"> Need Help? </a>
          </div>
        </div>
        <div>
          <div class="flex gap-2 my-4">
            <p class="text-sm text-gray-50 opacity-50">New to Netfilx?</p>
            <a href="/register"
              ><p class="text-white text-sm">Sign up now.</p></a
            >
          </div>
          <div>
            <p class="text-xs text-gray-400">
              This page is protected by Google reCAPTCHA to ensure you're not a
              bot.
            </p>
            <a href=""><p class="text-xs text-blue-500">Learn more.</p></a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
  
<script setup>
useSeoMeta({
  title: "Sign In",
});
import { onMounted } from "vue";
import { useUserStore } from "~/stores/user";

const userStore = useUserStore();

const { apiBase } = useRuntimeConfig().public;
const router = useRouter();

const emailOrPhone = ref("");
const email = ref("");
const phone = ref("");
const password = ref("");
const rememberActive = ref(false);

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^(\+\d{1,3}[\s]?)?\(?\d{1,4}\)?[\s]?\d{1,15}$/;

const isValidEmailOrPhone = computed(() => {
  return (
    emailPattern.test(emailOrPhone.value) ||
    phonePattern.test(emailOrPhone.value)
  );
});

const isValidPassword = computed(() => {
  const passwordPattern = /^[\w!@#$%^&*()_+={}\[\]|\\:;'",.<>?/`~-]{4,60}$/;
  return passwordPattern.test(password.value);
});

const setEmailAndPhone = () => {
  if (emailPattern.test(emailOrPhone.value)) {
    email.value = emailOrPhone.value;
  } else if (phonePattern.test(emailOrPhone.value)) {
    phone.value = emailOrPhone.value;
  }
};

const handleSubmit = async () => {
  if (isValidPassword.value && isValidEmailOrPhone.value) {
    setEmailAndPhone();
    fetchlogin();
  } else {
    alert("EmailOrPhone Or Password Invalid");
  }
};

const fetchlogin = async () => {
  try {
    const response = await fetch(`${apiBase}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        telephone: phone.value,
      }),
    });
    const data = await response.json();
    alert(data.message);
    const { token, payload } = data;
    localStorage.setItem("access_token", token);
    setUsername(payload.user.email, payload.user.telephone);
    checkRemember();

    router.push("/dashboard");
  } catch (error) {}
};

const fetchRemember = () => {
  const storedId = localStorage.getItem("user_id");
  if (storedId) {
    emailOrPhone.value = storedId;
    rememberActive.value = true;
  }
};

const setUsername = (email, telephone) => {
  if (email != "") {
    userStore.login(email);
  } else if (telephone != "") {
    userStore.login(telephone);
  }
};

const checkRemember = () => {
  if (rememberActive.value) {
    localStorage.setItem("user_id", emailOrPhone.value);
  } else {
    localStorage.removeItem("user_id");
  }
};

onMounted(() => {
  fetchRemember();
});
</script>
  
<style scoped>
</style>