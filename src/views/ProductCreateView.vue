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
      console.log(imageUrl.value);
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
    <h1 class="text-center">Produkt erstellen</h1>
        <form @submit.prevent="submit">
            <v-container>
                <v-row justify="center">
                    <v-col
                        cols="12" md="7"
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
                        cols="12" md="7"
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
                        cols="12" md="7"
                    >
                        <v-text-field
                            v-model.number="price"
                            label="Price"
                            type="number"
                            step="0000.01"
                            hide-details
                            required
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12" md="7"
                    >
                        <v-text-field
                            v-model="imageUrl"
                            :counter="50"
                            label="Image URL"
                            hide-details
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="7">
                        <v-btn class="mt-2 bg-deep-purple-darken-3" type="submit" block>Submit</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </form>
</template>
