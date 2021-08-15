<!-- Page d'administration du site -->

<template>
	<div class="container">
		<main class="col-12">
			<!--Titre de la page-->
			<section class="col-12">
				<h2 class = "text-white bg-secondary text-center">Zone Administration</h2>
				<Accueil></Accueil>
			</section>
			<section id="main" class="row">
				<div class="col-12 col-md-4">
					<!-- Bloc utilisateur-->
					<article class="card bg-light my-3 class=center-block" style="float:none;">
						<div class="card-header">
							<div class="row justify-content-around">
								<div class="m-1">Bonjour {{ nameCurrentUser }}
									<p class= "text-center text-white bg-danger">Administrateur</p> 
								</div>
								<button @click="sessionClear">DECONNEXION</button>
							</div>
						</div>
						<div class="card-body text-center">
							<div class="dropdown text-center">
								<p>Membre depuis le {{ creation }}</p>
							</div>
						</div>
					</article>
				</div>
				<!--Choix de lister les messages, commentaires ou les utilisateurs-->
				<article class="col-md-8">
					<h2 class="text-black text-center m-5 ">Que voulez faire ?</h2>
					<div class="row justify-content-around">
						<button @click="ListeCommentMess()" class="btn btn-secondary rounded shadow font-weight-bold p-3 m-2">Liste des Messages et des Commentaires</button>
						<button @click="ListeUtilisateurs()" class="btn btn-secondary rounded shadow font-weight-bold p-3 m-2">Liste des Utilisateurs</button>
					</div>
				</article>
			</section>
		</main>
	</div>
</template>

// <script>
import Accueil from '../components/Accueil';
import axios from 'axios';
import router from '../router';
import '../main.css';

export default {
	name: 'Administrateur',
	components: {
		Accueil
	},
	data() {
		return {
			isAdmin: false,
			nameCurrentUser: '',
			creation: ''
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
		},
		ListeCommentMess() {
			router.replace('http://localhost:8080/api/ListeCommentaire');
		},
		ListeUtilisateurs() {
			router.replace('http://localhost:8080/api/ListeUtilisateur');
		}
	}
};
</script>
