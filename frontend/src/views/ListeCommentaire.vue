<template>
	<main class="container">
		<div class="col-12">
			<!--Titre de la page-->
			<div class="col-12">
				<router-link v-if="isAdmin" to="/Administrateur"
					><h2 class="my-2 btn-secondary font-weight-bold">Zone Administration</h2></router-link
				>
				<Accueil></Accueil>
			</div>
			<section id="main" class="row">
				<sub class="col-12 col-md-4">
					<!--Bloc utilisateur-->
					<article class="card bg-light my-3 class=center-block" style="float:none;">
						<div class="card-header">
							<div class="row justify-content-around">
								<p class="m-1">Bonjour {{ nameCurrentUser }} !</p>
								<button class="btn btn-light mb-3 mt-3">
								<button @click="sessionClear">DECONNEXION</button>
								</button>
							</div>
						</div>
						<div class="card-body text-center">
							<div class="dropdown text-center">
								<p>Membre depuis le {{ creation }}</p>
							</div>
							<div>
								<router-link v-if="isAdmin" to="/Administrateur">
										<button class="btn btn-secondary mb-2">Retour au COMPTE</button>
										</router-link>
							</div>
						</div>
						<div class="card-body mx-auto">
							<button class="btn btn-dark rounded" style="cursor:default">
								Pour intervenir sur les commentaires, rendez-vous à la page des commentaires.
							</button>
						</div>
					</article>
				</sub>
				<!-- bloc listes messages  -->
				<sub class="col col-md-6">
					<h2 class="text-white text-center m-5 ">
						Liens vers tous les messages et leurs commentaires.
					</h2>
					<div class="badge p-3 tableauEntete">
						<span class="spanTableau">Date</span>
						<span class="spanTableau">Auteur</span>
						<span class="spanTableau">Message(s)</span>
						<span class="spanTableau">Id</span>
						<!-- <span class="spanTableau">Voir</span> -->
					</div>
					<div v-for="i in messages" :key="i">
						<div class="badge p-3 tableauListe">
							<span class="spanTableau">
								Le
								{{
									i.createdAt
										.slice(0, 10)
										.split('-')
										.reverse()
										.join('/')
								}}
							</span>
							<span class="spanTableau"> {{ i.userName.charAt(0).toUpperCase() + i.userName.slice(1) }} </span>
							<span class="spanTableau"> {{ i.message.slice(0, 10) }}...</span>
							<span class="spanTableau"> n° : {{ i.id }}</span>
							<!-- <span class="spanTableau"> </span> -->
						</div>
					</div>
				</sub>
			</section>
		</div>
	</main>
</template>

<script>
import Accueil from '../components/Accueil';
import axios from 'axios';
import router from '../router';
import '../main.css';

export default {
	name: 'ListeCommentaire',
	components: {
		Accueil
	},
	data() {
		return {
			isAdmin: false,
			messages: [],
			nameCurrentUser: '',
			creation: ''
		};
	},
	created: function() {
		let id = sessionStorage.getItem('userId');
		let self = this;
		axios
			.get('http://localhost:3000/api/messages', { headers: { Authorization: 'Bearer ' + sessionStorage.getItem('token') } })
			.then(res => {
				console.log(res);
				if (res) {
					self.messages = res.data.list;
					console.log(res.data.list);
				} else {
					console.log('aucun message');
				}
			})
			.catch(error => {
				console.log(error);
			});
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
	},
	methods: {
		sessionClear() {
			sessionStorage.clear();
			router.push({ path: '/' });
		},
		VoirUnMessage(m) {
			console.log(m);
			sessionStorage.setItem('MessageId', m);
			router.replace('http://localhost:8080/api/comment');
		}
	}
};
</script>
