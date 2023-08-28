const insertAt = (arr,o,i) =>
  arr.slice(0,i).concat([o]).concat(arr.slice(i+1))

const replaceArrInArr = (arr1,arr2,i) => 
  arr1.slice(0,i).concat(arr2).concat(arr1.slice(i+arr2.length))

const zip = (a, b) => a.map((e, i) => [e, b[i]])

const skipRange = (start,end,skip=1) => {
  var l = []
  var next = start-skip
  for(let i=start; i<end; i++)
    l.push(next+=skip)
  return l
}

export {insertAt,replaceArrInArr,zip,skipRange}