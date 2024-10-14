<script setup>
import {useProductStore} from "@/store/productStore";
import {onMounted, ref} from "vue";
import Product from "@/components/Product.vue";
import {useAuthStore} from "@/store/authStore";
import router from "@/router";

const productStore = useProductStore();
const authStore = useAuthStore();
const modalVisible = ref(false);
const productIdForDelete = ref('');

onMounted(() => {
    productStore.loadProducts()
})

function openModal(productId) {
    modalVisible.value = !modalVisible.value;
    productIdForDelete.value = productId;
}

function deleteProduct() {
    productStore.deleteProduct(productIdForDelete.value);
    modalVisible.value = false;
    router.push('/')
}

</script>

<template>
    <h1 class="mb-5 text-center">Produkte</h1>
    <div v-if="!productStore.products.length" class="text-center ma-16">
        <h3>No Products available</h3>
    </div>
    <v-row>
        <v-col cols="4" v-for="p in productStore.products">
            <Product :product="p"/>
            <v-btn :to="'/' + p.productId" v-if="authStore.isAdmin">Produkt bearbeiten</v-btn>
            <v-btn v-if="authStore.isAdmin" @click="openModal(p.productId)">Produkt löschen</v-btn>
        </v-col>
    </v-row>

    <v-dialog v-model="modalVisible" max-width="200px">
        <v-card>
            <v-card-title>Delete Product</v-card-title>
            <v-card-text>Are you sure you wanna delete this product?</v-card-text>
            <v-card-actions>
                <v-btn @click="deleteProduct">Yes</v-btn>
                <v-btn @click="openModal">No</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
