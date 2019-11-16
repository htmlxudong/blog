const mongoose = require('mongoose')

// 数据库连接配置
let Mongoose = {
    url: 'mongodb://localhost:27017/Blog',
    connect() {
        mongoose.connect(this.url, { useUnifiedTopology: true,useNewUrlParser: true },(err) => {
            if(!err) {
                console.log('mongoose 连接成功')
            } else {
                console.log('mongoose 连接失败')
            }
        })
    }
}

module.exports = {
    Mongoose
}