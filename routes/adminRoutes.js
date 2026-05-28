const express = require("express");

const router = express.Router();

const adminController =
require("../controllers/adminController");

/* DASHBOARD */

router.get(
    "/admin",
    adminController.dashboard
);

/* ADD MOVIE */

router.get(
    "/admin/add-movie",
    adminController.addMoviePage
);

router.post(
    "/admin/add-movie",
    adminController.addMovie
);

/* EDIT MOVIE */

router.get(
    "/admin/edit/:id",
    adminController.editMoviePage
);

router.post(
    "/admin/edit/:id",
    adminController.editMovie
);

/* DELETE */

router.get(
    "/admin/delete/:id",
    adminController.deleteMovie
);

module.exports = router;