 
Thenjs().eachSeries([0, 1, 2], function (cont, value) {
  task(value * 2, cont); 
})
.then(function (cont, result) {
  console.log(result);
});
function task(a,b){
b+=a;
console.log(b);
}