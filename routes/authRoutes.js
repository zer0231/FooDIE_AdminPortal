
const { Router } = require('express');
const authController = require('../controllers/authController');
const router = Router();

router.get('/', authController.home_get);

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);

router.get('/login',authController.login_get);
router.post('/login',authController.login_post);

router.get('/dashboard',authController.dashboard_get);
router.post('/dashboard',authController.dashboard_post);
router.post('/dashboard',authController.dashboard_put);


router.get('/dashboard/editProduct/:productId',authController.editproduct_get);

router.get('/logout',authController.logout_get);

router.get('/notify/:userId',authController.notify_get);
router.post('/notify',authController.notify_post);

router.get('/dashboard/myProducts',authController.myProduct_get);

router.get('/dashboard/profile',authController.profile_get);

router.get('/dashboard/addProduct',authController.addProduct_get);
router.post('/dashboard/addProduct',authController.addProduct_post);

router.get('*', function(req, res){ res.status(404).send('what???'); });


module.exports = router;