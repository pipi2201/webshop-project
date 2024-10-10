<script setup>
  import {ref} from "vue";
  import {useProductStore} from "@/store/productStore";
  import router from "@/router";

  const title = ref('');
  const description = ref('');
  const price = ref(null);
  const imageUrl = ref('');

  const productStore = useProductStore();

  function submit() {
      productStore.addProduct({
          title: title.value,
          description: description.value,
          price: price.value,
          imageUrl: imageUrl.value
      })
      router.push('/')
  }

</script>

<template>
    <h1>Produkt erstellen</h1>
        <form @submit.prevent="submit">
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
                    <v-btn class="mt-2" type="submit" block>Submit</v-btn>
                </v-row>
            </v-container>
        </form>
</template>
