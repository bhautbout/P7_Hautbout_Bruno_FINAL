<!--Page de création de commentaire-->

<template>
	<main class="container">
		<section class="row card bg-light m-5 p-3">
			<form enctype="multipart/form-data">
				<div class="header">
					<h1 class="btn btn-secondary" >
						Vous commentez la publication n° :
						<span class="badge font-weight-bold"> {{ callNumber() }}</span>
					</h1>
				</div>
				<div class="row">
					<div class="col-12 justify-content-center form-group">
						<label for="newComment">C'est parti !</label>
						<textarea
							v-on:keydown="isInvalid = false"
							class="form-control"
							v-model="newComment"
							id="newComment"
							name="comment"
							rows="8"
							placeholder="Rédigez votre commentaire ici"
						></textarea>
					</div>
				</div>
				<div class="footer col-10 mx-auto align-content-center">
					<div><button type="submit" @click.prevent="send()" class="btn btn-success font=weight-bold btn-block m-2 p-2">Valider</button></div>
					<router-link to="/FluxMesCom">
						<div><a class="btn btn-danger btn-block m-2 p-2">Annuler</a></div></router-link
					>
				</div>
				<div v-show="isInvalid" class="invalidBox m-2" key="invalid">
					<p>Veuillez renseigner le champ "Rédigez votre commentaire ici"</p>
				</div>
			</form>
		</section>
	</main>
</template>

<script>
import axios from 'axios';
import router from '../router';
import '../main.css';

export default {
	name: 'CreerCommentaire',
	data() {
		return {
			isAdmin: false,
			currentUserId: '',
			newComment: '',
			comments: [],
			isInvalid: false
		};
	},
	methods: {
		callName() {
			let name = sessionStorage.getItem('userName');
			return name.charAt(0).toUpperCase() + name.slice(1);
		},
		callNumber() {
			return sessionStorage.getItem('MessageId');
		},
		send() {
			if (!this.newComment || !sessionStorage.getItem('userId') || !sessionStorage.getItem('MessageId' || this.newComment.lemgth > 1500)) {
				this.isInvalid = true;
			} else {
				let UserId = sessionStorage.getItem('userId');
				let comment = this.newComment.toString();
				let MessageId = sessionStorage.getItem('MessageId');

				axios
					.post(
						'http://localhost:3000/api/comments/',
						{ UserId, comment, MessageId },
						{ headers: { Authorization: 'Bearer ' + sessionStorage.getItem('token') } }
					)
					.then(() => {
						this.UserId = '';
						this.newMessage = '';

						alert('Commentaire Posté!');
						router.push({ path: 'Commentaire' });
					})
					.catch(error => {
						console.log(error);
					});
			}
		}
	}
};
</script>
