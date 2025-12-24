function mainDashboard(req, res) {
  res.status(200).json({
    message: 'Youre are now allowed to enter here. This is the main dashboard',
    userInfo: req.userInfo,
  });
}

module.exports = { mainDashboard };
