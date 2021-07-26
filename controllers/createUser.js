module.exports = (req, res) => {
    // console.log(req.flash('data'))
    try {
        res.render('register', { errors: req.flash("registrationErrors"), data: req.flash('data')[0] })
    } catch (error) {
        console.error(error.message)
    }
}