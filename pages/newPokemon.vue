<template>
  <v-container>
    <v-form>
      <v-card class="pa-4">
        <v-row>
          <v-col>
            <v-text-field
              v-model="pokemon.name"
              :counter="10"
              label="Name"
              required
            ></v-text-field>
          </v-col>
          <v-col>
            <v-autocomplete
              v-model="pokemon.types"
              :items="types"
              multiple
              chips
              :rules="[(v: string[]) => !!v || 'Item is required']"
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
                <v-list-item v-bind="props" class="d-flex" title="" value="">
                  <v-row class="pa-0 ga-0 d-flex justify-center items-center">
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
              :counter="10"
              label="Base experience"
              required
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="pokemon.weight"
              :counter="10"
              label="Weight"
              required
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
            ></v-combobox>
          </v-col>
          <v-col>
            <v-combobox
              v-model="pokemon.moves"
              :items="[]"
              label="Moves"
              chips
              multiple
            ></v-combobox>
          </v-col>
        </v-row>

        <v-row v-for="stat in stats">
          <v-col class="flex-grow-0 flex-shrink-0" style="flex-basis: 110px">
            <p style="text-transform: capitalize !important">
              {{ stat.replace("-", " ") }}
            </p>
          </v-col>
          <v-col>
            <v-slider
              :step="1"
              :max="255"
              :min="0"
              :color="getStatsColor(stat)"
            ></v-slider>
          </v-col>
          <v-col cols="1">
            <v-text-field
              density="compact"
              style="width: 80px"
              type="number"
              variant="outlined"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-file-input clearable label="Image"></v-file-input>
          </v-col>
        </v-row>
        <div class="d-flex flex-column">
          <v-btn class="mt-4" color="success" block> Add Pokemon </v-btn>
          <v-btn class="mt-4" color="error" block> Reset Form </v-btn>
        </div>
      </v-card>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import type { IPokemon, IPokemonStat } from "~/types/pokemon";
import { types, getTypeColor, getStatsColor } from "~/utils";

const pokemon = ref<Omit<IPokemon, "id">>({
  name: "",
  types: [],
  base_experience: 0,
  weight: 0,
  abilities: [],
  species: { name: "" },
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
</script>
