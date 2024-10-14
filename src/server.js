const app = require('./app');


function startServer (){
    app.listen(4002,()=>{
        console.log("server is running on port 4002 !");
    })
}
function run(){
    startServer();
}

run();