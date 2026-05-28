const db = require("../config/db");

/* =========================
   HOME PAGE + SEARCH
========================= */

exports.home = (req, res) => {

    const category = req.query.category;

    const search = req.query.search;

    let sql = `
        SELECT
            movies.*,
            categories.name AS category_name
        FROM movies
        LEFT JOIN categories
        ON movies.category_id = categories.id
    `;

    let conditions = [];

    let values = [];

    /* CATEGORY */

    if(category){

        conditions.push(
            "categories.name=?"
        );

        values.push(category);

    }

    /* SEARCH */

    if(search){

        conditions.push(
            "movies.title LIKE ?"
        );

        values.push(`%${search}%`);

    }

    /* WHERE */

    if(conditions.length > 0){

        sql += `
            WHERE
            ${conditions.join(" AND ")}
        `;

    }

    sql += `
        ORDER BY movies.id DESC
    `;

    db.query(
        sql,
        values,
        (err, movies) => {

            if(err){

                console.log(err);

            }

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
                        `
                        SELECT *
                        FROM categories
                        `,
                        (err, categories) => {

                            res.render(
                                "home",
                                {

                                    movies,

                                    trendingMovies,

                                    categories,

                                    category,

                                    search,

                                    user:
                                    req.session.user || null

                                }
                            );

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
                `
                SELECT *
                FROM categories
                `,
                (err, categories) => {

                    res.render(
                        "movie",
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