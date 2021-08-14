<!--Centre de l'application VUE-->

<template>
	<div id="app">
		<Navigation></Navigation>
		<router-view></router-view>
	</div>
</template>

<script>
import Navigation from './components/Navigation';

export default {
	name: 'App',
	components: {
		Navigation
	}
};
</script>

<style>
body {
	background: rgb(255, 255, 255);
}
</style>
