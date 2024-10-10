<script setup>
    import {useProductStore} from "@/store/productStore";

    const productStore = useProductStore();

    const props = defineProps({
        product: Object
    })

</script>

<template>
    <v-card
        class="mx-auto ma-2"
        width="300"
        height="300"
    >
        <template v-slot:title>
            <span class="font-weight-black">{{product.title}}</span>
        </template>
        <v-img
            :src="product.imageUrl"
            alt="Product Image"
            height="150"
        ></v-img>

        <v-card-text class="bg-surface-light pt-4">
            <p>Description: {{product.description}}</p>
            <p>Price: {{product.price}}</p>
        </v-card-text>
    </v-card>
</template>

<style scoped>

</style>
