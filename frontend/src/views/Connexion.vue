<!--Page de connexion au compte-->

<template>
	<main class="container">
		<section class="col-12 col-md-8 mt-5 mx-auto p-3 bg-light rounded">
			<form @submit.prevent="handleSubmit">
				<h1 class="text-center font-weight-bold" style="font-size:4vw;">CONNEXION</h1>
				<div class="form-group mt-3">
					<label for="inputEmail">Email:</label>
					<input
						v-on:keydown="isInvalid = false"
						v-model="inputEmail"
						type="email"
						class="form-control"
						id="inputEmail"
						aria-labelledby="aideEmail"
						placeholder="votre email"
					/>
					<span id="aideEmail" class="form-text font-italic">Veuillez prendre contact en cas d'oubli</span>

				</div>
				<div class="form-group mt-3">
					<label for="inputPassword">Mot de passe:</label>
					<input
						v-on:keydown="isInvalid = false"
						v-model="inputPassword"
						type="password"
						class="form-control"
						id="inputPassword"
						aria-describedby="aidePassword"
						placeholder="votre mot de passe"
					/>
					<span id="aidePassword" class="form-text font-italic">Veuillez prendre contact en cas d'oubli</span>

				</div>
				<button type="submit" class="btn boutonConnectInscrip p-2 w-100 border-0 rounded font-weight-bold">SE CONNECTER</button>
			</form>
		</section>
		<div v-show="isInvalid" class="invalidBox m-3" key="invalid">
			Veuillez vérifier vos informations de connexion.
		</div>
		<div class=" col-7 mx-auto mt-3">
			<router-link to="/inscription"
				><button class=" text-white p-2 w-100 border-0 rounded shadow btn-secondary font-weight-bold">S'INSCRIRE</button></router-link
			>
		</div>
	</main>
</template>

<script>
import axios from 'axios';
import router from '../router';
import '../main.css';

export default {
	name: 'Accueil',
	data() {
		return {
			inputEmail: '',
			inputPassword: '',
			isInvalid: false
		};
	},
	methods: {
		handleSubmit() {
			if (!this.inputEmail || !this.inputPassword) {
				return (this.isInvalid = true);
			}

			axios
				.post('http://localhost:3000/api/auth/login', {
					email: this.inputEmail,
					password: this.inputPassword
				})
				.then(function(res) {
					sessionStorage.setItem('token', res.data.token);
					sessionStorage.setItem('userId', res.data.userId);
					sessionStorage.setItem('userName', res.data.userName);
					sessionStorage.setItem('role', res.data.role);
					router.push({ path: 'FluxMesCom' });
				})
				.catch(error => {
					this.isInvalid = true;
					console.log(error);
				});
		}
	}
};
</script>
