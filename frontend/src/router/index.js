import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
	{
		path: '/',
		name: 'Connexion',
		component: () => import('../views/Connexion')
	},
	{
		path: '/Administrateur',
		name: 'Administrateur',
		component: () => import('../views/Administrateur')
	},
	{
		path: '/Compte',
		name: 'Compte',
		component: () => import('../views/Compte')
	},
	{
		path: '/Commentaire',
		name: 'Commentaire',
		component: () => import('../views/Commentaire')
	},
	{
		path: '/ListeCommentaire',
		name: 'ListeCommentaire',
		component: () => import('../views/ListeCommentaire')
	},
	{
		path: '/CreerMessage',
		name: 'CreerMessage',
		component: () => import('../views/CreerMessage')
	},
	{
		path: '/CreerCommentaire',
		name: 'CreerCommentaire',
		component: () => import('../views/CreerCommentaire')
	},
	{
		path: '/inscription',
		name: 'Inscription',
		component: () => import('../views/Inscription')
	},
	{
		path: '/FluxMesCom',
		name: 'FluxMesCom',
		component: () => import('../views/FluxMesCom')
	},
	{
		path: '/ListeUtilisateur',
		name: 'ListeUtilisateur',
		component: () => import('../views/ListeUtilisateur')
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});

router.beforeEach((to, from, next) => {
	const publicPages = ['/', '/inscription'];
	const authRequired = !publicPages.includes(to.path);
	const loggedIn = sessionStorage.getItem('userId');
	const loggedToken = sessionStorage.getItem('token');
	if (authRequired && !loggedIn && !loggedToken) {
		return next('/');
	}
	next();
});

export default router;
