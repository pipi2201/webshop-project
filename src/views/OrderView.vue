<script setup>
import {ref} from "vue";

const showDeliveryAdress = ref(true);
const selectedBtn = ref('delivery');

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
            v-model="street"
            :rules="rules"
            label="Street"
        ></v-text-field>
        <v-text-field
        v-model="number"
        :rules="rules"
        label="Number"
        ></v-text-field>
        <v-text-field
            v-model="zip"
            :rules="rules"
            label="ZIP"
        ></v-text-field>
        <v-text-field
            v-model="city"
            :rules="rules"
            label="City"
        ></v-text-field>
        <v-text-field
            v-model="country"
            :rules="rules"
            label="Country"
        ></v-text-field>
        <v-btn class="mt-2" type="submit" block>Submit</v-btn>
    </v-form>
    <v-form v-if="showDeliveryAdress" @submit.prevent class="mt-10">
        <h2>Lieferadresse</h2>
        <v-text-field
            v-model="street"
            :rules="rules"
            label="Street"
        ></v-text-field>
        <v-text-field
            v-model="number"
            :rules="rules"
            label="Number"
        ></v-text-field>
        <v-text-field
            v-model="zip"
            :rules="rules"
            label="ZIP"
        ></v-text-field>
        <v-text-field
            v-model="city"
            :rules="rules"
            label="City"
        ></v-text-field>
        <v-text-field
            v-model="country"
            :rules="rules"
            label="Country"
        ></v-text-field>
        <v-btn class="mt-2" type="submit" block>Submit</v-btn>
    </v-form>
</template>
