const registerUser = (req, res) => {
  try {
    throw Error("Error");
  } catch (error) {
    res.status(500).send({ code: 500, message: "Internal server error" });
  }
};

const validateUser = (req, res) => {
  try {
    throw Error("Error");
  } catch (error) {
    res.status(500).send({ code: 500, message: "Internal server error" });
  }
};

const updatePassword = (req, res) => {
  try {
    throw Error("Error");
  } catch (error) {
    res.status(500).send({ code: 500, message: "Internal server error" });
  }
};

const updateEmail = (req, res) => {
  try {
    throw Error("Error");
  } catch (error) {
    res.status(500).send({ code: 500, message: "Internal server error" });
  }
};

module.exports = { registerUser, validateUser, updatePassword, updateEmail };
