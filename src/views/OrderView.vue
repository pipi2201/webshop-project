<script setup>
import {ref, watch} from "vue";
import {useCartStore} from "@/store/cartStore";

const cartStore = useCartStore();

const showDeliveryAddress = ref(true);
const selectedBtn = ref('delivery');
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

//todo: second watcher and v-model naming
watch(invoiceAddress, () => {
    invoiceAddress.value.street = cartStore.cart.invoiceAddress.street;
    invoiceAddress.value.number = cartStore.cart.invoiceAddress.number;
    invoiceAddress.value.zip = cartStore.cart.invoiceAddress.zip;
    invoiceAddress.value.city = cartStore.cart.invoiceAddress.city;
    invoiceAddress.value.country = cartStore.cart.invoiceAddress.country;
}, {immediate: true});


function deliver() {
    showDeliveryAdress.value = true;
}

function pickup() {
    showDeliveryAdress.value = false;
}
</script>
<template>
    <h1>Kassa</h1>
    <v-radio-group v-model="selectedBtn">
        <v-row>
            <v-col cols="2">
                <v-radio @click="deliver" label="Lieferung" value="delivery" color="orange-darken-3"></v-radio>
            </v-col>
            <v-col cols="2">
                <v-radio @click="pickup" label="Abholung" value="pickup" color="primary"></v-radio>
            </v-col>
        </v-row>
    </v-radio-group>
    <v-form @submit.prevent>
        <h2>Rechnungsadresse</h2>
        <v-text-field
            v-model="invoiceAddress.street"
            label="Street"
        ></v-text-field>
        <v-text-field
            v-model="number"
            label="Number"
        ></v-text-field>
        <v-text-field
            v-model="zip"
            label="ZIP"
        ></v-text-field>
        <v-text-field
            v-model="city"
            label="City"
        ></v-text-field>
        <v-text-field
            v-model="country"
            label="Country"
        ></v-text-field>
        <div v-if="showDeliveryAdress">
            <h2 class="mt-10">Lieferadresse</h2>
            <v-text-field
                v-model="street2"
                label="Street"
            ></v-text-field>
            <v-text-field
                v-model="number2"
                label="Number"
            ></v-text-field>
            <v-text-field
                v-model="zip2"
                label="ZIP"
            ></v-text-field>
            <v-text-field
                v-model="city2"
                label="City"
            ></v-text-field>
            <v-text-field
                v-model="country2"
                label="Country"
            ></v-text-field>
        </div>
        <v-btn class="mt-2" type="submit" block>Submit</v-btn>
    </v-form>
</template>
