<template>
	<main class="container">
		<section class="row card bg-light m-5 p-3">
			<form enctype="multipart/form-data">
				<div class="header p-1">
					<h1 class="btn btn-secondary" style="cursor:default">
						Vous allez créer une nouvelle publication
					</h1>
				</div>
				<div class="row">
					<div class="col-12 justify-content-center form-group">
						<label for="newMessage">Ecrivez quelque chose.</label>
						<textarea
							v-on:keydown="isInvalid = false"
							class="form-control"
							v-model="newMessage"
							id="newMessage"
							name="message"
							rows="8"
							placeholder="Saisissez ici votre message."
						></textarea>
					</div>
					<div class="col-12 justify-content-center text-center">
						<img :src="newImage" class="w-50 rounded" />
						<p class="text-center">Formats des photos acceptés: jpg, jpeg, webp, png et gif.</p>
					</div>
					<div class="col-12 justify-content-center">
						<div class="form-group justify-content-center">
							<label for="File">Téléchargez une photo</label>
							<input
								@change="selectFile()"
								type="file"
								ref="file"
								name="image"
								class="form-control-file"
								id="File"
								accept=".jpg, .jpeg, .webp, .gif, .png"
							/>
						</div>
					</div>
				</div>
				<div class="footer col-10 mx-auto align-content-center">
					<div><button type="submit" @click.prevent="send()" class="btn btn-success btn-block m-2 p-2">Valider</button></div>
					<router-link to="/FluxMesCom">
						<div><a class="btn btn-danger btn-block m-2 p-2">Annuler</a></div></router-link
					>
				</div>
				<div v-show="isInvalid" class="invalidBox m-2" key="invalid">
					<p>
						Vous devez joindre un message et un photo pour valider votre message.
					</p>
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
	name: 'CreerMessage',
	data() {
		return {
			isAdmin: false,
			newImage: '',
			currentUserId: '',
			newMessage: '',
			file: null,
			messages: [],
			isInvalid: false
		};
	},
	methods: {
		callName() {
			let name = sessionStorage.getItem('userName');
			return name.charAt(0).toUpperCase() + name.slice(1);
		},
		selectFile() {
			this.file = this.$refs.file.files[0];
			this.newImage = URL.createObjectURL(this.file);
		},
		send() {
			if (!this.file || !sessionStorage.getItem('userName') || !this.newMessage || this.newMessage > 1500) {
				this.isInvalid = true;

			} else {
				const formData = new FormData();
				formData.append('image', this.file);
				formData.append('UserId', sessionStorage.getItem('userId'));
				formData.append('message', this.newMessage.toString());
				axios
					.post('http://localhost:3000/api/messages/', formData, { headers: { Authorization: 'Bearer ' + sessionStorage.getItem('token') } })
					.then(() => {
						this.UserId = '';
						this.newMessage = '';
						this.file = null;
						alert('Publication crée');
						router.push({ path: 'FluxMesCom' });
					})
					.catch(error => {
						console.log(error);
					});
			}
		}
	}
};
</script>
