const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin-controller");
const authMiddleware = require("../middleware/auth-middleware")
const adminMiddleware = require("../middleware/admin-middleware")


// the next() in the code moves from one middleware to next then next and so specified below
router.route('/users').get(authMiddleware, adminMiddleware,adminController.getAllUsers);
router.route('/users/:id').get(authMiddleware, adminMiddleware,adminController.getUserById);
router.route('/users/update/:id').patch(authMiddleware, adminMiddleware,adminController.updateUserById);
router.route('/contacts').get(adminController.getAllContacts);
router.route('/users/delete/:id').delete(authMiddleware, adminMiddleware,adminController.deleteUserById);
router.route('/contacts/delete/:id').delete(authMiddleware, adminMiddleware,adminController.deleteContactById);
router.route('/services').get(adminController.getAllServices);
router.route('/services/delete/:id').delete(authMiddleware, adminMiddleware,adminController.deleteServiceById);
router.route('/services/:id').get(authMiddleware, adminMiddleware,adminController.getServiceById);
router.route('/services/update/:id').patch(authMiddleware, adminMiddleware,adminController.updateServiceById);
router.route('/services/addservice').post(authMiddleware, adminMiddleware, adminController.addService);


module.exports = router;