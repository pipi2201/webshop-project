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
const Id = ref(null);
const basketModalVisible = ref(false);
const remark = ref('');
const quantity = ref(1);

onMounted(() => {
    productStore.loadProducts();
    if (authStore.isUser) {
        cartStore.loadItems();
    }
})

function openModal(productId) {
    modalVisible.value = !modalVisible.value;
    Id.value = productId;
}

function openBasketModal(productId) {
    basketModalVisible.value = !basketModalVisible.value;
    Id.value = productId;
}

function deleteProduct() {
    productStore.deleteProduct(Id.value);
    modalVisible.value = false;
}

function addToBasket() {
    cartStore.addProductToBasket({
        productId: Id.value,
        amount: quantity.value,
        remark: remark.value
    });
    basketModalVisible.value = false;
}
</script>

<template>
    <h1 class="mb-8 text-center">Products</h1>
    <div v-if="!productStore.products.length" class="text-center ma-16">
        <h3>No Products available</h3>
    </div>
    <v-row>
        <v-col cols="12" lg="4" md="6" v-for="p in productStore.products">
            <v-card
                class="mx-auto bg-indigo-lighten-5 pb-2"
            >
                <Product class="mb-1" :product="p"/>
                <v-btn variant="outlined" class="text-yellow-darken-4 bg-yellow-lighten-4 v-btn--size-large mx-4" :to="'/' + p.productId" v-if="authStore.isAdmin">Edit</v-btn>
                <v-btn class="bg-red-darken-4 v-btn--size-large" v-if="authStore.isAdmin" @click="openModal(p.productId)">Delete</v-btn>
                <v-btn class="bg-yellow-darken-1" v-if="authStore.isUser" @click="openBasketModal(p.productId)">Add to Basket</v-btn>
            </v-card>
        </v-col>
    </v-row>

    <v-dialog v-if="authStore.isAdmin" v-model="modalVisible" max-width="300px">
        <v-card>
            <v-card-title>Delete Product</v-card-title>
            <v-card-text>Are you sure you wanna delete this product?</v-card-text>
            <v-card-actions>
                <v-btn @click="deleteProduct">Yes</v-btn>
                <v-btn @click="openModal">No</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog v-if="authStore.isUser" v-model="basketModalVisible" max-width="300px">
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
