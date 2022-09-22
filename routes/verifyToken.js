const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) res.status(403).json("Le token n'est pas bon !");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("vous n'etes pas loggué !");
  }
};

const verifyTokenAndRole = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id ) {
      next();
    } else {
      return res.status(403).json("vous n'etes pas authorisé à rentrer ici !");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
	verifyToken(req, res, () => {
	  if (req.user.isAdmin ) {
		next();
	  } else {
		return res.status(403).json("vous n'etes pas authorisé à rentrer ici !");
	  }
	});
  };

module.exports = { verifyToken, verifyTokenAndRole, verifyTokenAndAdmin };
