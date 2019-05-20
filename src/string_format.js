function formatString(str, ...args) {

    let matches = str.match(new RegExp('\%([0-9]+\@)?(#[ox])?-?([1-9][0-9]*)?(\.?[1-9][0-9]*)?[doxsbf]', "g"))
    if (matches == null || matches.length == 0) {
        return str
    }

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

    if (args.length < Object.keys(pointedArgsList).length) {
        return "args are not enough."
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
            let formatType = match.substr(match.length - 1, 1)
            switch (formatType) {
                case 'f': // 小数
                case 'd': // 整数
                    formatedArg = Number(arg)
                    if(formatType == 'd'){
                        formatedArg = Math.floor(formatedArg)
                    }
                    formatedArg = formatedArg + ''
                    
                    if (match.match(/[1-9][0-9]*[df]/)) {

                        let stuff = ' '; // パッド
                        let s = match.search(/[1-9][0-9]*[df]/) // フォーマット後の出力長を定義している文字列開始位置
                        let totalLength = Number(match.substring(s, match.length - 1)) // フォーマット後の出力長
                        let repeatNum = totalLength - formatedArg.length // パッドを繰り返すべき回数

                        // ゼロ埋め
                        if (match.match(/0[1-9][0-9]*[df]/)) {
                            stuff = '0'
                            formatedArg = stuff.repeat(repeatNum > 0 ? repeatNum : 0) + formatedArg

                        }
                        // スペース埋め
                        else {
                            // 左寄せ
                            if (match.match(/-.*[df]/)) {
                                formatedArg = stuff.repeat(repeatNum > 0 ? repeatNum : 0) + formatedArg
                            }
                            // 右寄せ
                            else {
                                formatedArg += stuff.repeat(repeatNum > 0 ? repeatNum : 0)
                            }
                        }
                        // 精度（最大表示幅）指定がある場合はカットする
                        if (match.match(/\.[1-9][0-9]*[df]/)) {
                            formatedArg = formatedArg.substr(0, totalLength)
                        }
                    } else {

                    }
                    break
                case 'o':
                    break
                case 'x':
                    break
                case 's': // 文字列
                    if (typeof arg != 'string') {
                        // Error
                    }
                    formatedArg = arg

                    if (match.match(/[1-9][0-9]*s/)) {
                        let s = match.search(/[1-9][0-9]*s/) // フォーマット後の出力長を定義している文字列開始位置
                        let totalLength = Number(match.substring(s, match.length - 1)) // フォーマット後の出力長
                        let repeatNum = totalLength - formatedArg.length // パッドを繰り返すべき回数

                        if (match.match(/-.*s/)) {
                            formatedArg = ' '.repeat(repeatNum > 0 ? repeatNum : 0) + formatedArg
                        }
                        // 右寄せ
                        else {
                            formatedArg += ' '.repeat(repeatNum > 0 ? repeatNum : 0)
                        }

                        if (match.match(/\.[1-9][0-9]*s/)) {
                            formatedArg = formatedArg.substr(0, totalLength)
                        }
                    }

                    break
                default:
                // ERROR
            }
            let matchStartAt = str.search(match)
            str = str.substring(0, matchStartAt) + formatedArg + str.substring(matchStartAt + match.length)
        })
    })


    return str
}

let formattedStr = formatString('hoge%-6.4s*%.6f', 'foobarbaz', 1234.567890)
console.log('formattedStr = ' + formattedStr)

// let date = new Date()
// console.log('[start] '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()+':'+date.getMilliseconds())
// for(let i = 0; i < 200000; i++){
//     let formattedStr = formatString('hoge%-6.4s*%12f', 'foobarbaz', 1234.567890)
// }

// date = new Date()
// console.log('[start] '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()+':'+date.getMilliseconds())

