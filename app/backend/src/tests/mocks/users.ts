const userFromDB = {
  dataValues: {
    username: 'User',
    role: 'user',
    email: 'user@user.com',
    password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO', 
      // senha: secret_user
  }
}

const userLoginBody = {
  email: 'user@user.com',
  password: 'secret_user', 
}

export default {
  userFromDB,
  userLoginBody
}