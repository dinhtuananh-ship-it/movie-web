const db = require("../config/db");
const bcrypt = require("bcryptjs");

exports.registerPage = (req, res) => {
    res.render("register", {
        error: null
    });
};

exports.loginPage = (req, res) => {
    res.render("login", {
        error: null
    });
};

exports.register = async (req, res) => {

    try{

        const {
            name,
            email,
            password
        } = req.body;

        if(!name || !email || !password){
            return res.render("register", {
                error: "Vui lòng nhập đầy đủ thông tin"
            });
        }

        db.query(
            "SELECT * FROM users WHERE email=?",
            [email],
            async (err, result) => {

                if(result.length > 0){

                    return res.render("register", {
                        error: "Email đã tồn tại"
                    });

                }

                const hashedPassword =
                    await bcrypt.hash(password, 10);

                db.query(
                    `
                    INSERT INTO users(
                        name,
                        email,
                        password
                    )
                    VALUES(?,?,?)
                    `,
                    [
                        name,
                        email,
                        hashedPassword
                    ],
                    () => {

                        res.redirect("/login");

                    }
                );

            }
        );

    }catch(error){

        console.log(error);

        res.send("Register Error");

    }

};

exports.login = (req, res) => {

    try{

        const {
            email,
            password
        } = req.body;

        db.query(
            "SELECT * FROM users WHERE email=?",
            [email],
            async (err, result) => {

                if(result.length === 0){

                    return res.render("login", {
                        error: "Email không tồn tại"
                    });

                }

                const user = result[0];

                const check =
                    await bcrypt.compare(
                        password,
                        user.password
                    );

                if(!check){

                    return res.render("login", {
                        error: "Sai mật khẩu"
                    });

                }

                req.session.user = user;

                if(user.role === "admin"){

                    return res.redirect("/admin");

                }

                res.redirect("/");

            }
        );

    }catch(error){

        console.log(error);

        res.send("Login Error");

    }

};

exports.logout = (req, res) => {

    req.session.destroy(() => {

        res.redirect("/login");

    });

};