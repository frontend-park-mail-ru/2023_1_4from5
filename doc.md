url: user/profile,
method: 'GET',
response: {
    login: string,
    name: string,
    profile_photo: string,
    registration: Date
}
401 Unauthorized,
500 InternalServerError
200 Ok

url: user/homePage,
method: 'GET',
response: {
    creator_id: string,
    is_creator: bool,
    name: string,
    posts: Array,
    profile_photo: string
}
401
500
200

url: auth/signIn,
method: 'POST',
body: {
    login: string,
    password_hash: string
}
403
401
200

url: auth/signUp,
method: 'POST',
body: {
    login: string,
    name: string,
    password_hash: string
}
400
409
200
500

url: auth/logout,
method: 'GET',
400
200

creator/page
400
401
500
200
