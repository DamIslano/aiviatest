<script setup>
  import { reactive } from 'vue'
  import { useVuelidate } from '@vuelidate/core'
  import { email, minLength, required } from '@vuelidate/validators'
	import { useRouter } from 'vue-router'

	const router = useRouter()

  const initialState = {
    password: '',
    email: '',
  }

  const state = reactive({
    ...initialState,
  })

  const rules = {
    password: { required, minLengthValue: minLength(6) },
    email: { required, email },
  }

  const v$ = useVuelidate(rules, state)

  function clear () {
    v$.value.$reset()

    for (const [key, value] of Object.entries(initialState)) {
      state[key] = value
    }
  }

	async function submit() {
		const result = await v$.value.$validate()
		if (!result) return
		router.push('/game')
	}
</script>

<template>
  <v-card variant="tonal" class="pa-5 w-75 mx-auto">
		<form @submit.prevent="submit">
			<v-text-field
				v-model="state.email"
				:error-messages="v$.email.$errors.map(e => e.$message)"
				error-size="24"
				label-color="white"
				label="E-mail"
				required
				class="mb-4 w-50 mx-auto text-white"
			></v-text-field>
			<v-text-field
				v-model="state.password"
				label-color="white"
				:error-messages="v$.password.$errors.map(e => e.$message)"
				label="Password"
				required
				class="w-50 mx-auto text-white"
			></v-text-field>
			<v-btn
				class="me-4 mt-4"
				color="#5865f2"
				@click="submit"
			>
				submit
			</v-btn>
			<v-btn @click="clear" class="mt-4">
				clear
			</v-btn>
		</form>
	</v-card>
</template>

<style>
.v-messages__message {
  font-size: 14px;
	color: #ff1f1f;
}
</style>