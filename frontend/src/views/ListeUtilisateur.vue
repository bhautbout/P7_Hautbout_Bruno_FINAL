<!--Page qui liste les utilisateurs-->

<template>
	<main class="container">
		<div class="col-12">
			<div class="col-12">
				<router-link v-if="isAdmin" to="/Administrateur"
					><h2 class="my-2 btn-secondary font-weight-bold">Administration du site</h2></router-link
				>
				<Accueil></Accueil>
			</div>
			<section id="main" class="row">
				<!-- bloc utilisateur -->
				<article class="col-12 col-md-4">
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
							<div>
								<router-link v-if="isAdmin" to="/Administrateur"
									><button v-if="isAdmin" type="button" class=" btn btn-secondary mx-auto rounded p-2">
										COMPTE
									</button></router-link
								>
							</div>
						</div>
						<div class="card-body mx-auto font-weight-bold">
								<p >Choisissez l'utilisateur à supprimer dans la liste ci-contre ></p>
						</div>
					</div>
				</article>
				<!--bloc liste utilisateurs-->
				<sub class="col col-md-8">
					<p class="text-black font-weight-bold text-center m-5 ">
						LISTE DE TOUS LES UTILISATEURS
					</p>
					<div class="badge btn-primary p-2 tableauEntete">
						<span class="spanTableau">Nom</span>
						<span class="spanTableau">Email</span>
						<span class="spanTableau">Inscrit le</span>
						<span class="spanTableau">Supprimer</span>
					</div>
					<div v-for="i in users" :key="i">
						<div class="badge btn-primary p-3 tableauListe">
							<span class="spanTableau"> {{ i.userName.charAt(0).toUpperCase() + i.userName.slice(1) }} </span>
							<span class="spanTableau"> {{ i.email }} </span>
							<span class="spanTableau">
								{{
									i.createdAt
										.slice(0, 10)
										.split('-')
										.reverse()
										.join('/')
								}}
							</span>
							<span class="spanTableau">
								<button class="rounded" @click="supprimerUnUtilisateur(i.id, isAdmin)">
									<img src="../assets/cancel.png" alt="logo eye" style="width:25px" />
								</button>
							</span>
						</div>
					</div>
				</sub>
			</section>
		</div>
	</main>
</template>

<script>
import axios from 'axios';
import router from '../router';
import '../main.css';
import Accueil from '../components/Accueil';

export default {
	name: 'ListeUtilisateur',
	components: {
		Accueil
	},
	data() {
		return {
			isAdmin: false,
			nameCurrentUser: '',
			creation: '',
			users: []
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
					.join('/');
				self.isAdmin = res.data.isAdmin;
				self.nameCurrentUser = res.data.userName.charAt(0).toUpperCase() + res.data.userName.slice(1);
			})
			.catch(error => {
				console.log(error);
			});

		axios
			.get('http://localhost:3000/api/users/all', { headers: { Authorization: 'Bearer ' + sessionStorage.getItem('token') } })
			.then(res => {
				this.users = res.data.found;
			})
			.catch(error => {
				console.log(error);
			})
			.catch(error => {
				console.log(error);
			});
	},
	methods: {
		supprimerUnUtilisateur(uid, isAdmin) {

			let confirmUserDeletion = confirm('Souhaitez-vous supprimer cet utilisateur ?');
			if (confirmUserDeletion == true) {
				axios
					.delete('http://localhost:3000/api/users/', {
						headers: {
							Authorization: 'Bearer ' + sessionStorage.getItem('token')
						},
						params: {
							uid: uid,
							isAdmin: isAdmin
						}
					})
					.then(res => {
						console.log(res);
						alert("Confirmez votre choix en validant sur le bouton Ok");
						router.replace('http://localhost:8080/api/ListeUtilisateur');
					})
					.catch(error => {
						location.reload();
						console.log(error);
					});
			} else {
				return;
			}
		},
		sessionClear() {
			sessionStorage.clear();
			router.push({ path: '/' });
		},
		VoirUnMessage(m) {
			sessionStorage.setItem('MessageId', m);
			router.replace('http://localhost:8080/api/comment');
		}
	}
};
</script>
