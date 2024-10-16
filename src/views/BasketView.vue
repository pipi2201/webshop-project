<script setup>
import {useCartStore} from "@/store/cartStore";
import Product from "@/components/Product.vue";
import {onMounted} from "vue";
import CartItem from "@/components/CartItem.vue";

const cartStore = useCartStore();

onMounted(() => {
    cartStore.loadItems()
    console.log(cartStore.cart);
});
</script>
<template>
    <h1>Warenkorb</h1>
    <div v-if="!cartStore.cart.items" class="text-center ma-16">
        <h3>No Products in Cart</h3>
    </div>
    <v-row>
        <v-col cols="4" v-for="i in cartStore.cart.items">
            <CartItem :item="i"></CartItem>
        </v-col>
    </v-row>
</template>
