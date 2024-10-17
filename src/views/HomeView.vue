<script setup>
import {useProductStore} from "@/store/productStore";
import {onMounted, ref, watch} from "vue";
import Product from "@/components/Product.vue";
import {useAuthStore} from "@/store/authStore";
import {useCartStore} from "@/store/cartStore";

const productStore = useProductStore();
const authStore = useAuthStore();
const cartStore = useCartStore();
const modalVisible = ref(false);
const productIdForDelete = ref('');
const productIdForAddToBasket = ref(0);
const basketModalVisible = ref(false);
const remark = ref('');
const quantity = ref(1);

onMounted(() => {
    productStore.loadProducts()
})

function openModal(productId) {
    modalVisible.value = !modalVisible.value;
    productIdForDelete.value = productId;
}

function openBasketModal(productId) {
    basketModalVisible.value = !basketModalVisible.value;
    productIdForAddToBasket.value = productId;
}

function deleteProduct() {
    productStore.deleteProduct(productIdForDelete.value);
    modalVisible.value = false;
}

function addToBasket() {
    cartStore.addProductToBasket({
        productId: productIdForAddToBasket.value,
        amount: quantity.value,
        remark: remark.value
    });
    basketModalVisible.value = false;
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
            <v-btn v-if="authStore.isUser" @click="openBasketModal(p.productId)">zum Warenkorb hinzufügen</v-btn>
        </v-col>
    </v-row>

    <v-dialog v-model="modalVisible" max-width="300px">
        <v-card>
            <v-card-title>Delete Product</v-card-title>
            <v-card-text>Are you sure you wanna delete this product?</v-card-text>
            <v-card-actions>
                <v-btn @click="deleteProduct">Yes</v-btn>
                <v-btn @click="openModal">No</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog v-model="basketModalVisible" max-width="300px">
        <v-card>
            <v-card-title>Zum Warenkorb hinzufügen</v-card-title>
            <v-card-text>
                <v-text-field
                    v-model="remark"
                    type="text"
                    hide-details="auto"
                    label="Comment"
                ></v-text-field>
                <v-text-field
                    v-model.number="quantity"
                    type="number"
                    hide-details="auto"
                    label="Quantity"
                ></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-btn @click="addToBasket">Add</v-btn>
                <v-btn @click="openBasketModal">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
