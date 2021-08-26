export const routes = {
    startPage: '/',
    auth: '/auth',
    loginTransition: '/loading',
    user: '/userProfile/:id', // this will have to be changed to "/user/:firstName.surName"
    editProfile: '/editProfile', 
    news: '/news',
    albums: '/albums', // this will have to be changed to "/albums"
    album: "/album/:id", // this will have to be changed to "/:firstName.surName/album/:id"
    albumCreator: "/albumCreator",
    groups: '/groups',
    search: '/search',
    notFound: '/notFound'
};
  