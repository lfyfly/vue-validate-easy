var test = require('./test')
test.t()
test.t1= function(){
  console.log(this.a)
}
test.t1()
