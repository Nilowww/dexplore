<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <PokemonCard :pokemon="pokemon" hide-favorites></PokemonCard>
        <v-divider class="my-5" />
        <div>
          <h3>Base Experience:</h3>
          <p>{{ pokemon.base_experience }}</p>
        </div>
        <v-divider class="my-5" />
        <div>
          <h3>Weight:</h3>
          <p>{{ pokemon.weight / 10 }} kg</p>
        </div>
      </v-col>
      <v-col cols="9">
        <v-form @submit.prevent="submitForm" ref="pokemonForm">
          <v-card class="pa-4">
            <v-row>
              <v-col>
                <v-text-field
                  v-model="pokemon.name"
                  :counter="20"
                  label="Name"
                  :rules="[
                    rules.isRequired,
                    (v: string) => !v.match(/\d+/g) || 'Numbers are not allowed',
                    (v: string) => v.length <= 20 || 'Name is too long'
                  ]"
                  required
                ></v-text-field>
              </v-col>
              <v-col>
                <v-autocomplete
                  v-model="pokemon.types"
                  :items="types"
                  multiple
                  chips
                  :rules="[rules.isRequired]"
                  label="Types"
                  required
                  :close-on-content-click="false"
                >
                  <template v-slot:chip="{ props, item, on }">
                    <v-chip :color="getTypeColor(item.value)" class="type-chip">
                      {{ item.value }}
                    </v-chip>
                  </template>

                  <template v-slot:item="{ props, item, on }">
                    <v-list-item
                      v-bind="props"
                      class="d-flex"
                      title=""
                      value=""
                    >
                      <v-row
                        class="pa-0 ga-0 d-flex justify-center items-center"
                      >
                        <v-col class="shrink-1 pr-0">
                          <v-checkbox
                            class="inline"
                            hide-details
                            :model-value="pokemon.types.includes(item.value)"
                          />
                        </v-col>
                        <v-col class="flex-grow-1 d-flex align-center pl-0">
                          <v-chip
                            :closable="false"
                            :color="getTypeColor(item.value)"
                          >
                            {{ item.value }}
                          </v-chip>
                        </v-col>
                      </v-row>
                    </v-list-item>
                  </template>
                </v-autocomplete>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="pokemon.base_experience"
                  label="Base experience"
                  :rules="[
                    rules.isRequired,
                    rules.isNumber,
                    (v: number) => (v && v <= 608) || 'Maximum value is 608'
                  ]"
                  required
                  @input="validateNumberInput"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="pokemon.weight"
                  label="Weight"
                  :rules="[
                    rules.isRequired,
                    rules.isNumber,
                    (v: number) => (v && v <= 1000) || 'Maximum value is 1000'
                  ]"
                  required
                  @input="validateNumberInput"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-combobox
                  v-model="pokemon.abilities"
                  :items="[]"
                  label="Abilities"
                  chips
                  multiple
                  :rules="[
                    rules.isRequired,
                    (v: string | any[]) => v.length >= 5 || 'At least 5 abilities are required',
                    (v: any[]) => v.every((ability: string) => !ability.match(/\d/)) || 'Numbers are not allowed in abilities',
                    (v: any[]) => v.every((ability: string | any[]) => ability.length >= 3) || 'Each ability must have at least 3 characters'
                  ]"
                ></v-combobox>
              </v-col>
              <v-col>
                <v-combobox
                  v-model="pokemon.moves"
                  :items="[]"
                  label="Moves"
                  chips
                  multiple
                  :rules="[
                    rules.isRequired,
                    (v: string | any[]) => v.length >= 5 || 'At least 5 moves are required',
                    (v: any[]) => v.every((move: string) => !move.match(/\d/)) || 'Numbers are not allowed in moves',
                    (v: any[]) => v.every((move: string | any[]) => move.length >= 3) || 'Each move must have at least 3 characters'
                  ]"
                ></v-combobox>
              </v-col>
            </v-row>

            <v-row v-for="(stat, id) in stats">
              <v-col
                class="flex-grow-0 flex-shrink-0"
                style="flex-basis: 110px"
              >
                <p style="text-transform: capitalize !important">
                  {{ stat.replace("-", " ") }}
                </p>
              </v-col>
              <v-col>
                <v-slider
                  v-model="pokemon.stats[id]"
                  :step="1"
                  :max="255"
                  :min="0"
                  :color="getStatsColor(stat)"
                ></v-slider>
              </v-col>
              <v-col cols="2">
                <v-text-field
                  v-model="pokemon.stats[id]"
                  density="compact"
                  type="number"
                  variant="outlined"
                  :rules="[
                    rules.isRequired,
                    rules.isNumber,
                    (v: number) => (v && v <= 255) || 'Maximum value is 255',
                  ]"
                  max="255"
                  min="0"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-file-input
                  clearable
                  label="Image"
                  v-model="image"
                  type="file"
                  hint="Add a picture of your pokemon. Make sure it's transparent!"
                  required
                  :rules="[rules.isRequired]"
                  @change="onFileChange"
                ></v-file-input>
              </v-col>
            </v-row>
            <div class="d-flex flex-column">
              <v-btn class="mt-4" color="success" block type="submit">
                Add Pokemon
              </v-btn>
              <v-btn class="mt-4" color="error" block @click="resetForm">
                Reset Form
              </v-btn>
            </div>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { isString } from "lodash";
import type { VForm } from "vuetify/components";
import PokemonCard from "~/components/PokemonCard.vue";
import type {
  IPokemon,
  IPokemonStat,
  IPokemonShort,
  IList,
} from "~/types/pokemon";
import { types, getTypeColor, getStatsColor } from "~/utils";
import { message } from "ant-design-vue";

const pokemonForm = ref<InstanceType<typeof VForm> | null>(null);
const image = ref<File[]>();
const pokemon = ref<IPokemon>({
  id: -1,
  name: "",
  types: [],
  base_experience: 100,
  weight: 100,
  abilities: [],
  moves: [],
  stats: [],
  sprites: {
    back_default: null,
    back_female: null,
    back_shiny: null,
    back_shiny_female: null,
    front_default: null,
    front_female: null,
    front_shiny: null,
    front_shiny_female: null,
    other: {},
    versions: {
      "generation-v": {
        "black-white": {
          animated: {
            front_default: "",
            back_default: "",
          },
        },
      },
    },
  },
});

function createImage() {
  const reader = new FileReader();
  console.log(image.value);
  reader.onload = (e) => {
    if (isString(e.target?.result)) {
      pokemon.value.sprites.front_default = e.target.result;
    }
  };
  reader.readAsDataURL(image.value as unknown as Blob);
}

function onFileChange(file: any) {
  if (!file) {
    return;
  }
  createImage();
}

function validateNumberInput(event: Event) {
  const input = event.target as HTMLInputElement;
  input.value = input.value.replace(/[^0-9]/g, "");
}


async function submitForm() {
  const validateValue = await pokemonForm.value?.validate();

  if (validateValue?.valid) {
    const response = await getData(`/my-pokemons?` + new URLSearchParams(), {
      method: "POST",
      body: JSON.stringify(pokemon.value),
    });
    if (response.error) {
      message.error(response.error.data.body)
    } else {
      message.success("Pokemon added successfully");
      resetForm();
    }
  } else {
    message.error("Error");
  }
}

function resetForm() {
  pokemon.value = {
    id: -1,
    name: "",
    types: [],
    base_experience: 0,
    weight: 0,
    abilities: [],
    moves: [],
    stats: [],
    sprites: {
      back_default: null,
      back_female: null,
      back_shiny: null,
      back_shiny_female: null,
      front_default: null,
      front_female: null,
      front_shiny: null,
      front_shiny_female: null,
      other: {},
      versions: {
        "generation-v": {
          "black-white": {
            animated: {
              front_default: "",
              back_default: "",
            },
          },
        },
      },
    },
  };
}
</script>
