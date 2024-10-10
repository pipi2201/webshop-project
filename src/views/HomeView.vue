<script setup>
import {useProductStore} from "@/store/productStore";
import {onMounted} from "vue";
import Product from "@/components/Product.vue";

const productStore = useProductStore()

onMounted(() => {
    productStore.loadProducts()
})
</script>

<template>
    <h1 class="mb-5 text-center">Produkte</h1>
    <div v-if="!productStore.products.length" class="text-center ma-16">
        <h3>No Products available</h3>
    </div>
    <v-row>
        <v-col cols="4" v-for="p in productStore.products">
            <Product :product="p"/>
        </v-col>
    </v-row>
</template>
