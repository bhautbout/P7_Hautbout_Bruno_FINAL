<!-- Bouton qui renvoi à l'accueil -->

<template>
	<header class="container">
		<div class="row justify-content-center">
			<nav class="m-auto">
				<router-link to="/FluxMesCom">
				<button type="button" class=" btn btn-dark" style="width: 100px">ACCUEIL
					
				</button></router-link>
			</nav>
		</div>
	</header>
</template>

<script>
export default {
	name: 'Accueil'
};
</script>
