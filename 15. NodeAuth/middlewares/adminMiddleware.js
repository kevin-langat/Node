function adminMiddleware(req, res, next) {
  const role = req.userInfo.role;
  if (role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'You are not authorised to this page',
    });
  }
  req.adminInfo = req.userInfo;
  next();
}
module.exports = adminMiddleware;
