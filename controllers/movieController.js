const db = require("../config/db");

/* =========================
   HOME PAGE
========================= */

exports.home = (req, res) => {

    const category = req.query.category;

    let sql = `
        SELECT
            movies.*,
            categories.name AS category_name
        FROM movies
        LEFT JOIN categories
        ON movies.category_id = categories.id
    `;

    let values = [];

    if(category){

        sql += `
            WHERE categories.name=?
        `;

        values.push(category);

    }

    sql += `
        ORDER BY movies.id DESC
    `;

    db.query(
        sql,
        values,
        (err, movies) => {

            db.query(
                `
                SELECT *
                FROM movies
                WHERE trending_rank > 0
                ORDER BY trending_rank ASC
                LIMIT 10
                `,
                (err, trendingMovies) => {

                    db.query(
                        "SELECT * FROM categories",
                        (err, categories) => {

                            res.render("home", {

                                movies,
                                trendingMovies,
                                categories,
                                category,
                                user:
                                req.session.user || null

                            });

                        }
                    );

                }
            );

        }
    );

};

/* =========================
   MOVIE DETAIL
========================= */

exports.movieDetail = (req, res) => {

    const id = req.params.id;

    db.query(
        `
        SELECT
            movies.*,
            categories.name AS category_name
        FROM movies
        LEFT JOIN categories
        ON movies.category_id = categories.id
        WHERE movies.id=?
        `,
        [id],
        (err, result) => {

            db.query(
                "SELECT * FROM categories",
                (err, categories) => {

                    res.render("movie", {

                        movie: result[0],
                        categories,
                        user:
                        req.session.user || null

                    });

                }
            );

        }
    );

};