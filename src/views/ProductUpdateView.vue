<script setup>
  import {useProductStore} from "@/store/productStore";
  import {useRoute} from "vue-router";
  import {computed, ref, watch} from "vue";

  const productStore = useProductStore();
  const route = useRoute();

  //todo: check if you can use id as string for put request
  const productId = computed(() => parseInt(route.params.productId));
  const product = computed(() => productStore.products.find(p => p.productId === productId.value));

  const title = ref('');
  const description = ref('');
  const price = ref(null);
  const imageUrl = ref('');

  title.value = product.value.title;
  description.value = product.value.description;
  price.value = product.value.price;
  imageUrl.value = product.value.imageUrl;

  function update() {
      productStore.updateProduct(productId, {
          title: title.value,
          description: description.value,
          price: price.value,
          imageUrl: imageUrl.value
      })
  }

</script>

<template>
    <h1>Produkt bearbeiten</h1>
    <form @submit.prevent="update">
        <v-container>
            <v-row>
                <v-col
                    cols="12"
                >
                    <v-text-field
                        v-model="title"
                        :counter="10"
                        label="Product name"
                        hide-details
                        required
                    ></v-text-field>
                </v-col>

                <v-col
                    cols="12"
                >
                    <v-text-field
                        v-model="description"
                        :counter="10"
                        label="Description"
                        hide-details
                        required
                    ></v-text-field>
                </v-col>

                <v-col
                    cols="12"
                >
                    <v-text-field
                        v-model.number="price"
                        label="Price"
                        type="number"
                        hide-details
                        required
                    ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                >
                    <v-text-field
                        v-model="imageUrl"
                        :counter="50"
                        label="Image URL"
                        hide-details
                        required
                    ></v-text-field>
                </v-col>
                <v-btn class="mt-2" type="submit" block>Ändern</v-btn>
            </v-row>
        </v-container>
    </form>
</template>

<style scoped>

</style>
