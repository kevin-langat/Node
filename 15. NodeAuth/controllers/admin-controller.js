function adminController(req, res) {
  res.status(200).json({
    success: true,
    message: 'You are now logged in as admin',
    adminData: req.userInfo,
  });
}
module.exports = adminController;
