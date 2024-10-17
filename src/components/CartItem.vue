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

onMounted(() => {
    productStore.loadProducts();
    cartStore.loadItems();
});

function openModal() {
    basketModalVisible.value = !basketModalVisible.value;
}

function updateItem() {
    cartStore.updateCartItem({
        productId: product.productId,
        amount: quantity.value,
        remark: remark.value
    }, product.productId);
    basketModalVisible.value = false;
}
</script>

<template>
    <v-card
        class="mx-auto ma-2"
        width="300"
        height="300"
    >
        <template v-slot:title>
            <span class="font-weight-black">{{product?.title}}</span>
        </template>
        <v-img
            :src="product?.imageUrl"
            alt="Product Image"
            height="150"
        ></v-img>
        <v-card-text class="bg-surface-light pt-4">
            <p>Comment: {{item.remark}}</p>
            <p>Quantity: {{item.amount}}</p>
        </v-card-text>
        <v-btn @click="openModal">Bearbeiten</v-btn>
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
</template>

<style scoped>

</style>
