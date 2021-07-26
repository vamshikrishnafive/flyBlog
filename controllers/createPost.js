module.exports = (req, res) => {
    try {
        if (req.session.userId) { return res.render('create') }
        res.redirect('/auth/login')
    } catch (error) {
        console.error(error.message)
    }
}