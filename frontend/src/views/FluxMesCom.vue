<!--Page qui affiche les messages-->

<template>
	<main class="container">
		<div class="col-12">
			<div class="col-12 ">
				<h2
					v-if="this.messages.length !== 0"
					class="col-12 my-2 bg-secondary text-white font-weight-bold"
				>
					Publications
				</h2>
				<p v-else class="col-12 my-2 font-weight-bold">
					Pas de publication pour l'instant, à vous de jouer !
				</p>
			</div>
			<section id="main" class="row">
				<!-- bloc utilisateur -->
				<article class="col-12 col-md-4">
					<div class="card bg-light my-3 class=center-block" style="float:none;">
						<div class="card-header">
							<div class="row justify-content-around">
								<p class="m-1">Bonjour {{ name }} !</p>
								<button @click="sessionClear">DECONNEXION</button>
							</div>
						</div>
						<div class="card-body">
							<div class="text-center">
								<p id="membre">Membre depuis le {{ creation }}</p>
							</div>
							<div id="compteButton" class="text-center">
								<router-link v-if="isAdmin" to="/Administrateur"
									><button type="button" class=" btn btn-secondary mx-auto rounded p-2 buttonsPanel">
										COMPTE Administrateur
									</button></router-link
								>
								<router-link v-else to="/Compte"
									><button type="button" class=" btn btn-secondary mx-auto rounded p-2 buttonsPanel">COMPTE</button></router-link
								>
							</div>
						</div>
						<div id="publicationButton" class=" card-body text-center">
							<router-link to="/CreerMessage"
								><button type="button" class="btn btn-dark mx-auto p-2 rounded buttonsPanel">PUBLIER</button></router-link
							>
						</div>
					</div>
				</article>
				<!--bloc message(s)-->
				<sub class="col-12 col-md-8">
					<div v-for="message in messages" :key="message.id" class="card bg-light my-3">
						<div class="card-header bg-light d-flex align-items-center justify-content-between m-0 p-1">
							<span class=" text-dark text-bold  p-1">
								Posté par {{ message.userName.charAt(0).toUpperCase() + message.userName.slice(1) }} le
								{{
									message.createdAt
										.slice(0, 10)
										.split('-')
										.reverse()
										.join('/') +
										' à ' +
										message.createdAt.slice(11, 16)
								}}
							</span>
							<div class="badge bg-info text-wrap text-white p-2" style="width: 6rem;">N°: {{ message.id }}</div>
						</div>
						<div class="btn" @click="pageCommentaire(message.id)">
							<img
								:src="message.messageUrl"
								v-if="message.messageUrl !== ''"
								class="border messImage"
								alt="image postée par un utilisateur"
							/>
						</div>
						<div class="p-2">
							<p v-if="isAdmin || message.UserId == id" class="ml-2">{{ message.message }}</p>
						</div>
						<div class="row card-footer justify-content-around">
							<button @click="pageCommentaire(message.id)" class="border-0">
								<img src="../assets/personnageParle.png" alt="comment_black" style="width:25px" />
							</button>
							<div v-if="isAdmin || message.UserId == id">
								<button @click="suppressionMessage(message.id, message.UserId, id)" class="border-0">
									<img src="../assets/cancel.png" alt="trash" style="width:25px" />
								</button>
							</div>
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

export default {
	name: 'FluxMesCom',
	data() {
		return {
			isAdmin: false,
			messages: [],
			id: '',
			name: '',
			creation: ''
		};
	},
	created: function() {
		let id = sessionStorage.getItem('userId');
		axios
			.get('http://localhost:3000/api/messages', { headers: { Authorization: 'Bearer ' + sessionStorage.getItem('token') } })
			.then(res => {
				if (res) {
					const rep = res.data.list;
					this.messages = rep;
					rep.splice(10);
					sessionStorage.setItem('MessageId', rep[0].id);
				} else {
					console.log('Aucun message');
				}
			})
			.catch(error => {
				console.log(error);
			});
		let self = this;
		axios
			.get('http://localhost:3000/api/users/' + id, { headers: { Authorization: 'Bearer ' + sessionStorage.getItem('token') } })
			.then(res => {
				console.log(res);
				self.id = res.data.id;
				self.name = res.data.userName.charAt(0).toUpperCase() + res.data.userName.slice(1);
				self.creation = res.data.createdAt
					.slice(0, 10)
					.split('-')
					.reverse()
					.join('/');
				self.isAdmin = res.data.isAdmin;
			})
			.catch(error => {
				console.log(error);
			});
	},
	methods: {
		pageCommentaire(m) {
			console.log(m);
			sessionStorage.setItem('MessageId', m);
			router.push({ path: '/Commentaire' });
		},
		suppressionMessage(a, b, c) {
			console.log(typeof a, typeof b, typeof c);
			let confirmMessageDeletion = confirm(
				'Soutaitez-vous supprimer l image ainsi que les commentaires de ce message ?'
			);
			if (confirmMessageDeletion == true) {
				axios
					.delete('http://localhost:3000/api/messages/' + a, {
						headers: {
							Authorization: 'Bearer ' + sessionStorage.getItem('token')
						}
					})
					.then(res => console.log(res))
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
		}
	}
};
</script>
