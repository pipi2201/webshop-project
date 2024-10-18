<script setup>
import {onMounted, ref, watch} from "vue";
import {useCartStore} from "@/store/cartStore";

const cartStore = useCartStore();
onMounted(() => {
    cartStore.loadItems();
})

const showDeliveryAddress = ref(true);
const selectedOption = ref('delivery');
const invoiceAddress = ref({
    street: '',
    number: '',
    zip: '',
    city: '',
    country: ''
})

const deliveryAddress = ref({
    street: '',
    number: '',
    zip: '',
    city: '',
    country: ''
})

watch(invoiceAddress, () => {
    console.log(invoiceAddress);
    invoiceAddress.value.street = cartStore.cart?.invoiceAddress?.street;
    invoiceAddress.value.number = cartStore.cart?.invoiceAddress?.number;
    invoiceAddress.value.zip = cartStore.cart?.invoiceAddress?.zip;
    invoiceAddress.value.city = cartStore.cart?.invoiceAddress?.city;
    invoiceAddress.value.country = cartStore.cart?.invoiceAddress?.country;
}, {immediate: true});

watch(deliveryAddress, () => {
    deliveryAddress.value.street = cartStore.cart?.deliveryAddress?.street;
    deliveryAddress.value.number = cartStore.cart?.deliveryAddress?.number;
    deliveryAddress.value.zip = cartStore.cart?.deliveryAddress?.zip;
    deliveryAddress.value.city = cartStore.cart?.deliveryAddress?.city;
    deliveryAddress.value.country = cartStore.cart?.deliveryAddress?.country;
}, {immediate: true});

function deliver() {
    showDeliveryAddress.value = true;
}

function pickup() {
    showDeliveryAddress.value = false;
}

function sendAddresses() {
    cartStore.addOrder({
        invoiceAddress: invoiceAddress.value,
        deliveryAddress: deliveryAddress.value,
        shippingType: selectedOption.value
    });
    console.log("SENT");
}

function test() {
    console.log(selectedOption.value);
}
</script>
<template>
    <h1>Kassa</h1>
    <v-radio-group v-model="selectedOption">
        <v-row>
            <v-col cols="2">
                <v-radio @click="deliver" label="Lieferung" value="delivery" color="orange-darken-3"></v-radio>
            </v-col>
            <v-col cols="2">
                <v-radio @click="pickup" label="Abholung" value="pickup" color="primary"></v-radio>
            </v-col>
        </v-row>
    </v-radio-group>
    <v-btn @click="test">test</v-btn>
    <v-form @submit.prevent="sendAddresses">
        <h2>Rechnungsadresse</h2>
        <v-text-field
            v-model="invoiceAddress.street"
            label="Street"
        ></v-text-field>
        <v-text-field
            v-model="invoiceAddress.number"
            label="Number"
        ></v-text-field>
        <v-text-field
            v-model="invoiceAddress.zip"
            label="ZIP"
        ></v-text-field>
        <v-text-field
            v-model="invoiceAddress.city"
            label="City"
        ></v-text-field>
        <v-text-field
            v-model="invoiceAddress.country"
            label="Country"
        ></v-text-field>
        <div v-if="showDeliveryAddress">
            <h2 class="mt-10">Lieferadresse</h2>
            <v-text-field
                v-model="deliveryAddress.street"
                label="Street"
            ></v-text-field>
            <v-text-field
                v-model="deliveryAddress.number"
                label="Number"
            ></v-text-field>
            <v-text-field
                v-model="deliveryAddress.zip"
                label="ZIP"
            ></v-text-field>
            <v-text-field
                v-model="deliveryAddress.city"
                label="City"
            ></v-text-field>
            <v-text-field
                v-model="deliveryAddress.country"
                label="Country"
            ></v-text-field>
        </div>
        <v-btn class="mt-2" type="submit" block>Submit</v-btn>
    </v-form>
</template>
