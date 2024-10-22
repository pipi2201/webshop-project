<script setup>
import {computed, onMounted, ref} from "vue";
import {useProductStore} from "@/store/productStore";
import {useCartStore} from "@/store/cartStore";

const cartStore = useCartStore();
const productStore = useProductStore();
const props = defineProps({
    item: Object
});

const product = computed(() => {
    return productStore.products.find(p => p.productId === props.item.productId)
});

const basketModalVisible = ref(false);
const quantity = ref(1);
const remark = ref('');
const modalVisible = ref(false);

onMounted(() => {
    productStore.loadProducts();
    cartStore.loadItems();
});

function openModal() {
    basketModalVisible.value = !basketModalVisible.value;
}

function openDeleteModal() {
    modalVisible.value = !modalVisible.value;
}

function updateItem() {
    cartStore.updateCartItem({
        amount: quantity.value,
        remark: remark.value
    }, product.value.productId);
    basketModalVisible.value = false;
}

function deleteCartItem() {
    cartStore.deleteItem(product, product.value.productId);
    modalVisible.value = false;
}
//images for products
//https://plus.unsplash.com/premium_photo-1728643592445-012fc53c3ea2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1MHx8fGVufDB8fHx8fA%3D%3D
//https://images.unsplash.com/photo-1728935367997-d9dd04a4d447?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8

</script>
//images for products
//https://plus.unsplash.com/premium_photo-1728643592445-012fc53c3ea2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1MHx8fGVufDB8fHx8fA%3D%3D
//https://images.unsplash.com/photo-1728935367997-d9dd04a4d447?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8
<template>
    <v-card
        class="mx-auto bg-indigo-lighten-5 ma-2"
        min-height="20em"
    >
        <template v-slot:title>
            <span class="font-weight-black text-center">{{product?.title}}</span>
        </template>
        <v-img
            :src="product?.imageUrl"
            alt="Product Image"
            height="150"
        ></v-img>
        <v-card-text class="bg-surface-light pt-4 text-center">
            <p>Comment: {{item.remark}}</p>
            <p>Quantity: {{item.amount}}</p>
        </v-card-text>
        <v-row justify="center">
            <v-btn class="bg-yellow-darken-4 mx-4" @click="openModal">Bearbeiten</v-btn>
            <v-btn class="bg-red-darken-4" @click="openDeleteModal">Löschen</v-btn>
        </v-row>
    </v-card>
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
                <v-btn @click="updateItem">Add</v-btn>
                <v-btn @click="openModal">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog v-model="modalVisible" max-width="300px">
        <v-card>
            <v-card-title>Delete Product</v-card-title>
            <v-card-text>Are you sure you wanna throw this product out of your cart?</v-card-text>
            <v-card-actions>
                <v-btn @click="deleteCartItem">Yes</v-btn>
                <v-btn @click="openDeleteModal">No</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped>

</style>
