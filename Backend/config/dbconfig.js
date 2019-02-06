const mongoose=require('mongoose')
module.exports={
    dbUrllocal:"mongodb://localhost/cityhopper",
    dbMlab:
    {
        uri:"mongodb://@ds131814.mlab.com:31814/cityhopper",
        auth:
        {
            user:"cityhopper",
            pass:"ChoppHopp123"

        }
    },
    connectMlabDb:function()
    {
        return mongoose.connect(
            this.dbMlab.uri,
            {
                useNewUrlParser: true,
                auth:
                {
                    user: this.dbMlab.auth.user,
                    password: this.dbMlab.auth.pass
                }
            }
        )
    },
    connectLocalDb:function()
    {
        return mongoose.connect(this.dbUrllocal)
    }

}
