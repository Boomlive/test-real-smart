exports.isValidInput = (req, res, next) => {
  const { email, password, telephone } = req.body;

  if (!password || !(telephone || email)) {
    return res.status(400).json({
      error: "Missing credentials",
      message: "Username and password are required.",
    });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern =
    /^(\+?\d{1,4}[\s-]?)?\(?\d{1,4}\)?[\s-]?\d{1,4}[\s-]?\d{1,9}$/;
  const passwordPattern = /^[\w!@#$%^&*()_+={}\[\]|\\:;'",.<>?/`~-]{4,60}$/;

  const testEmailOrPhone =
    emailPattern.test(email) || phonePattern.test(telephone);

  if (!testEmailOrPhone) {
    return res.status(400).json({
      message: "Validate Email or Telephone Failed.",
    });
  }

  const testpassword = passwordPattern.test(password);
  if (!testpassword) {
    return res.status(400).json({
      message: "Validate Password Failed.",
    });
  }

  next();
};
