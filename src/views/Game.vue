<script setup>
import { ref, watch } from 'vue';
import { numeric, maxLength } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

const sizeX = ref('');
const sizeY = ref('');
const grid = ref([]);

const rules = {
	sizeX: { numeric, maxLengthValue: maxLength(3) },
	sizeY: { numeric, maxLengthValue: maxLength(3) },
}

const v$ = useVuelidate(rules, {sizeX, sizeY})

watch([sizeX, sizeY], () => {
  generateGrid();
});

const generateGrid = () => {
  grid.value = [];
  for (let i = 0; i < sizeY.value; i++) {
    const row = [];
    for (let j = 0; j < sizeX.value; j++) {
      row.push({ color: '#d9e3ff' });
    }
    grid.value.push(row);
  }
};

const toggleColor = (rowIndex, colIndex) => {
  const currentColor = grid.value[rowIndex][colIndex].color;
  grid.value[rowIndex][colIndex].color = currentColor === '#d9e3ff' ? '#5865f2' : '#d9e3ff';
};
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-text-field v-model="sizeX" label="Size X" @input="v$.sizeX.$touch" :error-messages="v$.sizeX.$errors.map(e => e.$message)"></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field v-model="sizeY" label="Size Y" @input="v$.sizeY.$touch" :error-messages="v$.sizeY.$errors.map(e => e.$message)"></v-text-field>
      </v-col>
    </v-row>

    <div class="grid-container">
      <div
        v-for="(row, rowIndex) in grid"
        :key="rowIndex"
        class="grid-row"
      >
        <div
          v-for="(col, colIndex) in row"
          :key="colIndex"
          class="grid-item"
          :style="{ backgroundColor: col.color }"
          @mouseover="toggleColor(rowIndex, colIndex)"
        ></div>
      </div>
    </div>
  </v-container>
</template>

<style>
.grid-container {
  display: flex;
  flex-direction: column;
	align-items: center;
}

.grid-row {
  display: flex;
}

.grid-item {
  width: 36px;
  height: 36px;
  border: 1px solid black;
	margin: 2px;
}
</style>