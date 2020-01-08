const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test',
 { useNewUrlParser: true, useUnifiedTopology: true });

const conn = mongoose.connection;
conn.on('open',() => console.log('db is connect success!'))
//以上为连接数据库操作

const models = {
  user:{
    username:{
      type: String
    },
    password:{
      type: String
    }
  },
  playHistory:{
    username: {
      type: String
    },
    song:{
      type: Object,
      default: {}
    }
  },
  favoriteList: {
    username: {
      type: String
    },
    song: {
      type: Object,
      default: {}
    },
    songId: {
      type: Number
    }
  },
  searchHistory: {
    username: {
      type: String
    },
    songName: {
      type: String
    }
  }
}

for(let m in models){
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel: function(name){
    return mongoose.model(name)
  }
}

// 以上操作为一次性循环定义model(user)




