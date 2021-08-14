<!-- Page pour consulter son compte et possibilite de modifier son nom -->
<template>
	<main class="container">
		<div class="row justify-content-center">
			<div class="col-10">
				<!-- Info sur la page actuelle -->
				<div class="col-12">
					<h2 class="col-12 my-2 bg-secondary text-white font-weight-bold">Vous consultez votre compte</h2>
					<Accueil></Accueil>
				</div>
				<section id="main" class="row">
					<div class="col-12">

						<div class="card bg-light my-3 class=center-block" style="float:none;">
							<div class="card-header">
								<div class="row justify-content-around">
									<p class="m-1">Bonjour {{ nameCurrentUser }} !</p>
									<button @click="sessionClear">DECONNEXION</button>
								</div>
							</div>
							<div class="card-body text-center">
								<div class="dropdown text-center">
									<p>Membre depuis le {{ creation }}</p>
								</div>
							</div>
							<div class="card-body mx-auto">
								<div class="btn p-1" style="cursor:default">
									<button class="btn-warning p-2" style="cursor:default">
										<span class="m-1 text-white font-weight-bold"
											>Sur cette page, vous pouvez supprimer votre compte ou modifier votre nom. Toutes les images, commentaires seront également supprimés.</span
										>
									</button>
								</div>
							</div>
							<div id="updateButton" class=" card-body text-center">
								<label for="newName"></label>
								<textarea
									v-on:keydown="isInvalid = false"
									class="form-control"
									v-model="user"
									id="user"
									name="userName"
									rows="1"
									placeholder="Quel est votre nouveau nom ?"
								></textarea>
								<button type="button" class="btn btn-success mt-2 p-2 rounded buttonsPanel" @click="updateUser(user)">
									Validé
								</button>
							</div>
							<div class="card-body mx-auto">
								<div class="btn rounded p-3" style="cursor:default">
									<button @click="deleteMyAccount(id)" class="rounded p-2">
										<span class="m-3 font-weight-bold">Supprimer mon Compte</span
										><img src="../assets/cancel.png" alt="trash" style="width:25px" />
									</button>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	</main>
</template>

<script>
import Accueil from '../components/Accueil';
import axios from 'axios';
import router from '../router';
import '../main.css';

export default {
	name: 'Compte',
	components: {
		Accueil
	},
	data() {
		return {
			isAdmin: false,
			nameCurrentUser: '',
			user: '',
			creation: '',
			id: '',
			edit: false
		};
	},
	created: function() {
		let id = sessionStorage.getItem('userId');
		let self = this;
		axios
			.get('http://localhost:3000/api/users/' + id, { headers: { Authorization: 'Bearer ' + sessionStorage.getItem('token') } })
			.then(res => {
				self.creation = res.data.createdAt
					.slice(0, 10)
					.split('-')
					.reverse()
					.join('.');
				self.isAdmin = res.data.isAdmin;
				self.nameCurrentUser = res.data.userName.charAt(0).toUpperCase() + res.data.userName.slice(1);
				self.id = res.data.id;
			})
			.catch(error => {
				console.log(error);
			});
	},
	methods: {
		updateUser(userName) {
			axios
				.put(
					'http://localhost:3000/api/users/' + sessionStorage.getItem('userId'),
					{
						userName
					},
					{
						headers: {
							Authorization: 'Bearer ' + sessionStorage.getItem('token')
						}
					}
				)
				.then(res => {
					sessionStorage.setItem('userName', res.data.userName);
					window.location.reload();
				})
				.catch(err => console.log(err));
		},
		sessionClear() {
			sessionStorage.clear();
			router.push({ path: '/' });
		},
		deleteMyAccount(n) {
			let id = n;
			let confirmUserDeletion = confirm('voulez-vous vraiment supprimer votre compte ?');
			if (confirmUserDeletion == true) {
				axios
					.delete('http://localhost:3000/api/users/' + id, { headers: { Authorization: 'Bearer ' + sessionStorage.getItem('token') } })
					.then(res => {
						console.log(res);
						alert("Cliquez sur ok et l'utilisateur sera supprimé");
						router.replace('http://localhost:8080/api/');
					})
					.catch(error => {
						console.log(error);
					});
			} else {
				return;
			}
		},
		toCommentsList() {
			router.replace('http://localhost:8080/api/ListeCommentaire');
		},
		toUsersList() {
			router.replace('http://localhost:8080/api/ListeUtilisateur');
		}
	}
};
</script>
