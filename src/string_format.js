function formatString(str, ...args) {
    // console.log(' [formatString] str = ' + str)
    // console.log(' [formatString] args = ')
    // console.log(args)

    let matches = str.match(new RegExp('\%([0-9]+\@)?(#[ox]|0)?(\.[0-9]+)?[doxcs]', "g"))
    if (matches == null || matches.length == 0) {
        return str
    }
    console.log(matches)

    // 可変長引数の部分にどれだけ値が必要かを検査する
    let pointedArgsList = { 'none': [] }
    matches.forEach((f, index) => {
        let ms = f.match(new RegExp('[0-9]+\@', "g"))
        if (ms == null || ms.length == 0) {
            pointedArgsList['none'].push(index)
            return
        }
        // 0@の数値部分を得る
        let argIndex = Number(ms[0].substring(0, ms[0].length - 1))
        // カウントがあるなら増やす。なければ１を入れる
        if (!pointedArgsList[argIndex]) {
            pointedArgsList[argIndex] = []
        }
        pointedArgsList[argIndex].push(index)
    })

    console.log('pointedArgsList:')
    console.log(pointedArgsList)

    if (args.length < Object.keys(pointedArgsList).length) {
        return "引数が少なすぎる"
        // ERROR 
    }

    return "[OK]"
}

// matches = "%2@d".match(new RegExp('[0-9]+\@', "g"))
// console.log(matches)

let formattedStr = formatString('hoge %2@d %.0s', 3, 'piyo')
console.log('formattedStr = ' + formattedStr)