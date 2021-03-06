const queryString = require('query-string')
const axios = require('axios')
const { v4 } = require('uuid')
const jwt = require('jsonwebtoken')
const { User } = require('../../models')
const addDefaultcategories = require('../../helpers/addDefaultcategories')

exports.googleAuth = async (req, res) => {
  const stringifiedParams = queryString.stringify({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: `${process.env.BASE_URL}/auth/google-redirect`,
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '),
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
  })
  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`,
  )
}

exports.googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`
  const urlObj = new URL(fullUrl)
  const urlParams = queryString.parse(urlObj.search)
  const code = urlParams.code
  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: 'post',
    data: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.BASE_URL}/auth/google-redirect`,
      grant_type: 'authorization_code',
      code,
    },
  })
  const userData = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'get',
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  })

  const { email, name } = userData.data
  const user = await User.findOne({ email })
 

  if (user) {
    const { SECRET_KEY } = process.env
    const { _id } = user
    const payload = {
      _id,
    }
    
    const token = jwt.sign(payload, SECRET_KEY)
    await User.findByIdAndUpdate(user._id, { token })
    const newUser = await User.findOne({ token })
    return res.redirect(
      `${process.env.FRONTEND_URL}google-redirect?useremail=${newUser.email}`,
    )

    
  }

  const password = v4()
 
  const newUser = new User({ name, email })

  newUser.setPassword(password)
  await newUser.save()

  await addDefaultcategories(newUser._id)
  const { SECRET_KEY } = process.env
  const { _id } = newUser
  const payload = {
    _id,
  }


  const token = jwt.sign(payload, SECRET_KEY)
  await User.findByIdAndUpdate(_id, { token })
  
  return res.redirect(
    `${process.env.FRONTEND_URL}google-redirect?useremail=${user.email}`,
  )
 
}
