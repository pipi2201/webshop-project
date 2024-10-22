<script setup>
import {useCartStore} from "@/store/cartStore";
import {computed, onMounted, ref} from "vue";
import CartItem from "@/components/CartItem.vue";
import {useProductStore} from "@/store/productStore";

const cartStore = useCartStore();
const productStore = useProductStore();

onMounted(() => {
    cartStore.loadItems();
    productStore.loadProducts();
})

const total = computed( () => {
    return cartStore.cart?.items?.reduce((total, item) => {
        const product = productStore.products.find(p => p.productId === item.productId)
        return total + parseInt(item.amount) * parseInt(product?.price ?? 0);
    }, 0)
})

function deleteAll() {
    cartStore.deleteBasket();
}

</script>
<template>
    <h1 class="mb-8 text-center">Warenkorb</h1>
    <div v-if="!cartStore.cart?.items" class="text-center ma-16">
        <h3 class="text-center">No Products in Cart</h3>
    </div>
    <v-row justify="center">
        <v-col cols="12" lg="4" md="6" v-for="i in cartStore.cart?.items">
            <CartItem class="mb-1" :item="i"></CartItem>
        </v-col>
    </v-row>
    <h3 class="ma-8 text-center">Gesamtpreis: {{total}}€</h3>
    <v-row justify="center">
        <v-btn class="ms-8 bg-yellow-darken-3 v-btn--size-large" to="/Order">Bezahlen</v-btn>
        <v-btn class="ms-8 bg-red-darken-4 v-btn--size-large" @click="deleteAll">Warenkorb Löschen</v-btn>
    </v-row>
</template>
