url: user/profile,
method: 'GET',
response: {
    login: string,
    name: string,
    profile_photo: string,
    registration: Date
}
response_status: {
    401: Unauthorized,
    500: InternalServerError,
    200: Ok
}

url: user/homePage,
method: 'GET',
response: {
    creator_id: string,
    is_creator: bool,
    name: string,
    posts: Array,
    profile_photo: string
}
response_status: {
    401: Unauthorized,
    500: InternalServerError,
    200: Ok
}

url: auth/signIn,
method: 'POST',
body: {
    login: string,
    password_hash: string
}
response_status: {
    401: Unauthorized,
    403: Forbidden,
    200: Ok
}

url: auth/signUp,
method: 'POST',
body: {
    login: string,
    name: string,
    password_hash: string
}
response_status: {
    400: Bad Request,
    409: Conflict,
    200: Ok,
    500: Internal Server Error
}

url: auth/logout,
method: 'GET',
response_status: {
    400: Bad Request,
    200: Ok
}

url: creator/page,
method: 'GET',
response: {
    creator_info: {
        cover_photo: string,
        creator_id: string,
        description: string,
        followers_count: int,
        name: string,
        posts_count: int,
        user_id: string
    }
    is_my_page: bool,
    posts: Array of {
        creation_date: string,
        creator: string,
        id: string,
        is_available: true,
        text: string,
        title: string
    }
}
response_status: {
    400: Bad Request
    401: Unauthorized
    500: Internal Server Error
    200: Ok
}
