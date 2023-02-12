const mongoose = require('mongoose');

module.exports = () => {
   // mongdb cloud connection is here
  mongoose
    .connect("mongodb://127.0.0.1/StudentToDo", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log("Note : Successfully Connected to MongoDB");
    })
    .catch((err) => {
      console.log(err);
    }); 
};
