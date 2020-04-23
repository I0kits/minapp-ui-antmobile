export default {
  name: 'minapp',
  uris: {
    root: "/",
    main: '/main.html',
    login: '/login.html',
    profile: '/profile.html',

    register: '/register.html',
    registerConfirm: '/register/confirm.html',

    questionCreate: '/question/create.html',
    questionWithId: (id)=> `/question/${id}.html`,
  },
  apiUrl: (uri)=> `${process.env.API_HOST}${uri}`,
}
