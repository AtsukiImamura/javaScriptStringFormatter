function formatString(str, ...args) {
    // console.log(' [formatString] str = ' + str)
    // console.log(' [formatString] args = ')
    // console.log(args)

    let matches = str.match(new RegExp('\%([0-9]+\@)?(#[ox])?(\.?[0-9]+)?[doxcsefb]', "g"))
    if (matches == null || matches.length == 0) {
        return str
    }
    // console.log(matches)

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

    // console.log('pointedArgsList:')
    // console.log(pointedArgsList)

    if (args.length < Object.keys(pointedArgsList).length) {
        return "引数が少なすぎる"
        // ERROR 
    }

    // 変換対象の内容ごとに処理
    Object.keys(pointedArgsList).forEach(pointIdx => {
        let pointedArgIndexList = pointedArgsList[pointIdx]

        pointedArgIndexList.forEach(matchIdx => {
            // console.log(args)
            let arg = args[Number(matchIdx)]
            let match = matches[matchIdx]

            let formatedArg = null;

            // 書式指定子ごとに処理する
            switch (match.substr(match.length - 1, 1)) {
                case 'd': // 数値
                    formatedArg = Math.floor(Number(arg)) + ''
                    if (match.match('[1-9]+d')) {

                        let stuff = ' '; // パッド
                        let s = match.search('[1-9]+d') // フォーマット後の出力長を定義している文字列開始位置
                        let totalLength = Number(match.substring(s, match.length - 1)) // フォーマット後の出力長
                        let repeatNum = totalLength - formatedArg.length // パッドを繰り返すべき回数

                        // ゼロ埋め
                        if (match.match('0[1-9]+d')) {
                            stuff = '0'
                            formatedArg = stuff.repeat(repeatNum > 0 ? repeatNum : 0) + formatedArg

                        }
                        // スペース埋め
                        else {
                            // 左寄せ
                            if (match.match('-.*d')) {
                                formatedArg = stuff.repeat(repeatNum > 0 ? repeatNum : 0) + formatedArg
                            }
                            // 右寄せ
                            else {
                                formatedArg += stuff.repeat(repeatNum > 0 ? repeatNum : 0)
                            }
                        }
                        // 精度（最大表示幅）指定がある場合はカットする
                        if (match.match('\.[1-9]+d')) {
                            formatedArg = formatedArg.substr(0, totalLength)
                        }
                    } else {

                    }
                    break
                case 'o':
                    break
                case 'x':
                    break
                case 'c':
                    break
                case 's': // 文字列
                    if (typeof arg != 'string') {
                        // Error
                    }
                    formatedArg = arg
                    break
                case 'f':
                    break
                default:
                // ERROR
            }
            // console.log('pointIdx = ' + pointIdx + '  matchIdx = ' + matchIdx + '  arg = ' + arg + '  match = ' + match + '  matchStartAt = ' + matchStartAt)

            let matchStartAt = str.search(match)
            str = str.substring(0, matchStartAt) + formatedArg + str.substring(matchStartAt + match.length)
            // console.log('   => ' + str)
        })
    })


    return str
}

// matches = "%2@d".match(new RegExp('[0-9]+\@', "g"))
// console.log(matches)

let formattedStr = formatString('hoge%4d*%.6d', 3, 1234567890)
console.log('formattedStr = ' + formattedStr)

