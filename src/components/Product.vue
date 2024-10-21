<script setup>
    import {useProductStore} from "@/store/productStore";
    import logo from "@/assets/logo.svg"

    const productStore = useProductStore();

    const props = defineProps({
        product: Object
    })

</script>

<template>
    <v-card flat
        class="mx-auto bg-indigo-lighten-5"
            min-height="28em"
    >
        <template v-slot:title>
            <h3 class="font-weight-black text-center">{{product.title}}</h3>
        </template>
        <v-img
            :src="product.imageUrl !== '' ? product.imageUrl : logo"
            alt="Product Image"
            height="18rem"
        ></v-img>

        <v-card-text class="bg-surface-light pt-4">
            <h3 class="font-weight-medium mb-5">Description: {{product.description}}</h3>
            <h3 class="font-weight-medium">Price: {{product.price}}€</h3>
        </v-card-text>
    </v-card>
</template>

<style scoped>

</style>
