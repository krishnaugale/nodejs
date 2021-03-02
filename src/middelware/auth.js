const auth=  (req, res, next) =>{
    const token = req.header("Authorization");
    if (!token) {
      return res.status(400).send({
        message: "Access denied. Authentication token not found.",
        messageCode: "TKNERR",
      });
    }
    try {
      const payload = jwt.verify(token, secretKey);
      next();
    }
    catch (err) {
        console.log(err);
        return res.status(400).send({
          message: "Access denied. Invalid authentication token.",
          messageCode: "INVTKN",
        });
      }
    };

   // const token = jwt.sign({ foo: 'bar' }, 'shhhhh')

