<script setup>
const props = defineProps({
    item: Object
})
</script>

<template>
    <v-card
        class="mx-auto ma-2"
        width="300"
        height="300"
    >
        <template v-slot:title>
            <span class="font-weight-black">{{item.productId}}</span>
        </template>
        <v-img
            alt="Product Image"
            height="150"
        ></v-img>
        <v-card-text class="bg-surface-light pt-4">
            <p>Comment: {{item.remark}}</p>
            <p>Quatity: {{item.amount}}</p>
        </v-card-text>
    </v-card>
</template>

<style scoped>

</style>
