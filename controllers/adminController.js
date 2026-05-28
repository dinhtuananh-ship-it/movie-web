const db = require("../config/db");

/* =========================
   DASHBOARD
========================= */

const dashboard = (req, res) => {

    db.query(
        `
        SELECT
            movies.*,
            categories.name AS category_name
        FROM movies
        LEFT JOIN categories
        ON movies.category_id = categories.id
        ORDER BY movies.id DESC
        `,
        (err, movies) => {

            if(err){

                console.log(err);

            }

            res.render(
                "admin/dashboard",
                {

                    movies,

                    user:
                    req.session.user || null

                }
            );

        }
    );

};

/* =========================
   ADD MOVIE PAGE
========================= */

const addMoviePage = (req, res) => {

    db.query(
        "SELECT * FROM categories",
        (err, categories) => {

            res.render(
                "admin/addMovie",
                {

                    categories,

                    user:
                    req.session.user || null

                }
            );

        }
    );

};

/* =========================
   ADD MOVIE
========================= */

const addMovie = (req, res) => {

    const {
        title,
        description,
        category_id,
        thumbnail,
        banner,
        video,
        trending_rank
    } = req.body;

    db.query(
        `
        INSERT INTO movies
        (
            title,
            description,
            thumbnail,
            banner,
            video,
            category_id,
            trending_rank
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        [
            title,
            description,
            thumbnail,
            banner,
            video,
            category_id,
            trending_rank || 0
        ],
        () => {

            res.redirect("/admin");

        }
    );

};

/* =========================
   EDIT MOVIE PAGE
========================= */

const editMoviePage = (req, res) => {

    const id = req.params.id;

    db.query(
        "SELECT * FROM movies WHERE id=?",
        [id],
        (err, result) => {

            db.query(
                "SELECT * FROM categories",
                (err, categories) => {

                    res.render(
                        "admin/editMovie",
                        {

                            movie: result[0],

                            categories,

                            user:
                            req.session.user || null

                        }
                    );

                }
            );

        }
    );

};

/* =========================
   EDIT MOVIE
========================= */

const editMovie = (req, res) => {

    const id = req.params.id;

    const {
        title,
        description,
        category_id,
        thumbnail,
        banner,
        video,
        trending_rank
    } = req.body;

    db.query(
        `
        UPDATE movies
        SET
            title=?,
            description=?,
            thumbnail=?,
            banner=?,
            video=?,
            category_id=?,
            trending_rank=?
        WHERE id=?
        `,
        [
            title,
            description,
            thumbnail,
            banner,
            video,
            category_id,
            trending_rank || 0,
            id
        ],
        () => {

            res.redirect("/admin");

        }
    );

};

/* =========================
   DELETE MOVIE
========================= */

const deleteMovie = (req, res) => {

    const id = req.params.id;

    db.query(
        "DELETE FROM movies WHERE id=?",
        [id],
        () => {

            res.redirect("/admin");

        }
    );

};

module.exports = {

    dashboard,
    addMoviePage,
    addMovie,
    editMoviePage,
    editMovie,
    deleteMovie

};