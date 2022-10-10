module.exports.isAuth = (req, res, next) => {
    console.log(req.isAuthenticated());
    console.log(req.user);
    if (req.user) {
        next();
    } else {
        res.status(401).json({ msg: 'You are not authorized to view this resource' });
    }
}
