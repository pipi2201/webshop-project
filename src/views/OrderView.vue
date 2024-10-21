<script setup>
import {onMounted, ref, watch} from "vue";
import {useCartStore} from "@/store/cartStore";
import router from "@/router";

const cartStore = useCartStore();

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

onMounted(() => {
    cartStore.loadItems();

    watch(() => cartStore.cart?.invoiceAddress, (newInvoiceAddress) => {
        console.log(cartStore.cart?.invoiceAddress);
        if (newInvoiceAddress) {
            invoiceAddress.value = { ...newInvoiceAddress }; // Replace the whole object
        }
    }, { immediate: true });

    watch(() => cartStore.cart?.deliveryAddress, (newDeliveryAddress) => {
        if (newDeliveryAddress) {
            deliveryAddress.value = { ...newDeliveryAddress }; // Replace the whole object
        }
    }, { immediate: true });
})

function deliver() {
    showDeliveryAddress.value = true;
}

function pickup() {
    showDeliveryAddress.value = false;
}

async function sendAddressesAndOrder() {
    await cartStore.putOrderInCart({
        invoiceAddress: {...invoiceAddress.value},
        deliveryAddress: {...deliveryAddress.value},
        shippingType: selectedOption.value
    });
    await cartStore.loadItems();
    await cartStore.sendOrderOut();
    router.push('thanks');
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
    <v-form @submit.prevent="sendAddressesAndOrder">
        <h2>Rechnungsadresse</h2>
        <v-text-field
            v-model="invoiceAddress.street"
            label="Street"
        ></v-text-field>
        <v-text-field
            v-model.number="invoiceAddress.number"
            label="Number"
        ></v-text-field>
        <v-text-field
            v-model.number="invoiceAddress.zip"
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
                v-model.number="deliveryAddress.number"
                label="Number"
            ></v-text-field>
            <v-text-field
                v-model.number="deliveryAddress.zip"
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
