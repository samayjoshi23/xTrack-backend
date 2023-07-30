module.exports.homeData = async(req, res ) => {
    let data = {
        config: 'Welcome home'
    }
    res.status(200).send(data);
}