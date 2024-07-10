const adminMiddleware = async (req, res, next) => {
    try {
        console.log(req.user);
        const adminRole = req.user.isAdmin;
        if(!adminRole){
            return res.status(401).json({message: "You are not authorized to access this resource"});
        }
        // return res.status(200).json({message: req.user.isAdmin})
        // if user is an admin proceed to the next middleware
        next();
    } catch (error) {
        next(error)
    }
}

module.exports = adminMiddleware;