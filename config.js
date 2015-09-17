/**
 * Created by Tundaey on 6/24/2015.
 */
module.exports = {
    jwtsecret : process.env.SECRET ||'scoyanjsonwebtokensecret',
    db_url: 'mongodb://localhost:27017/scoyan',
    port: process.env.PORT || 9000
}