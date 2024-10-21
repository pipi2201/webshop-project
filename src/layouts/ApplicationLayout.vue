<script setup>
import { useAuthStore } from '@/store/authStore'
import {useCartStore} from "@/store/cartStore";
import {computed, onMounted, ref} from "vue";

const authStore = useAuthStore();
const cartStore = useCartStore();

onMounted(() => {
    if (authStore.isUser) {
        cartStore.loadItems()
    }
});

// Dynamically calculate itemAmount from the store's cart data
    const itemAmount = computed(() => {
        return cartStore.cart?.items?.reduce((total, item) => {
            const quantity = (item.amount) || 0;
            console.log(quantity);
            return total + quantity;
        }, 0);
    });

// function showConsoleLog() {
//     console.log(parseInt(cartStore.cart.items[0].amount));
// }

</script>
<template>
    <v-app-bar class="bg-deep-purple-darken-3">
        <v-app-bar-title>Pipi's WebShop</v-app-bar-title>
        <v-toolbar-items>
            <v-btn to="/basket" v-if="authStore.isUser" color="orange">{{itemAmount}}
                <v-icon
                icon="mdi-cart"
                color="orange"
                size="1.8em"
                >
                </v-icon>
            </v-btn>
            <v-btn to="/new-product" v-if="authStore.isAdmin">Add Product</v-btn>
            <template v-if="authStore.isLoggedIn">
                <v-btn @click="authStore.logout">Logout</v-btn>
<!--                <v-btn @click="showConsoleLog">test</v-btn>-->
            </template>
            <template v-else>
                <v-btn to="/login">Login</v-btn>
                <v-btn to="/register">Register</v-btn>
            </template>
        </v-toolbar-items>
    </v-app-bar>
    <v-main class="bg-indigo-lighten-4">
        <v-container fluid>
            <router-view/>
        </v-container>
    </v-main>
</template>
