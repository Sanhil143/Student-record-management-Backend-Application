const jwt = require('jsonwebtoken')

const teacherMiddle = (req, res, next) => {
      try {
            let token = req.headers["x-api-key"]
            if (!token) {
                  return res.status(400).send({ status: false, message: "token must be present" })
            }
            jwt.verify(token, "Sanhil", (err, decodedToken) => {
                  if (err) {
                        if (err.message == 'invalid token' || err.message == 'invalid signature') {
                              return res.status(401).send({ status: false, message: "token is not valid" })
                        }
                        if (err.message == 'jwt expired') {
                              return res.status(401).send({ status: false, message: "token is expired" })
                        }
                        return res.status(401).send({ status: false, message: err.message })
                  }
                  else {
                        req.teacherId = decodedToken.teacherId
                        next()
                  }
            })
      } catch (err) {
            return res.status(500).send({ status: false, message: err.message })
      }
}

const auth2 = async(req,res,next)=>{
      let id = req.params
      if(id == req.teacherId )return res.status(403).send({status: false ,message: "You are not authorize"})
      // let user = await userModel.findById({_id:id})
      next()
    
    }
    


module.exports = { teacherMiddle, auth2}