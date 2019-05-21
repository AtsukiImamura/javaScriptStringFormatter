import stringFormat from './stringFormat'

let formattedStr = stringFormat('hoge%-8.4s@@%08d', 'xyzab', 1234)
console.log('formattedStr = ' + formattedStr)

// let date = new Date()
// console.log('[start] '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()+':'+date.getMilliseconds())
// for(let i = 0; i < 200000; i++){
//     let formattedStr = formatString('hoge%-6.4s*%12f', 'foobarbaz', 1234.567890)
// }

// date = new Date()
// console.log('[start] '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()+':'+date.getMilliseconds())