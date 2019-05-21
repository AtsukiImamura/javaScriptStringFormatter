export default function(str, ...args) {

    let matches = str.match(new RegExp('\%([0-9]+\@)?(#[ox])?[-0]?([1-9][0-9]*)?(\.?[1-9][0-9]*)?[doxsbf]', "g"))
    if (matches == null || matches.length == 0) {
        return str
    }

    // インデックスごとに整理する。
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

    // 必要な数の可変引数が与えられていない場合はエラーとする
    if (args.length < Object.keys(pointedArgsList).length) {
        return "args are not enough."
        // ERROR 
    }

    // 変換対象の内容ごとに処理
    Object.keys(pointedArgsList).forEach(pointIdx => {
        let pointedArgIndexList = pointedArgsList[pointIdx]

        pointedArgIndexList.forEach(matchIdx => {
            let arg = args[Number(matchIdx)]
            let match = matches[matchIdx]
            let formatedArg = null;


            // 書式指定子ごとに必要な処理を施す
            let formatType = match.substr(match.length - 1, 1)
            switch (formatType) {
                case 'f': // 小数
                    if (typeof arg != 'number') {
                        // Error
                    }
                    formatedArg = Number(arg) + ''
                    break
                case 'd': // 整数
                    if (typeof arg != 'number') {
                        // Error
                    }
                    formatedArg = Math.floor(Number(arg)) + ''
                    break
                case 'o':
                    formatedArg = arg.toString(8)
                    break
                case 'x':
                    formatedArg = arg.toString(16)
                    break
                case 's': // 文字列
                    if (typeof arg != 'string') {
                        // Error
                    }
                    formatedArg = arg
                    break
                default:
                // ERROR
            }

            // フィールド幅指定がある場合は調整する
            if(match.match(/[1-9][0-9]*[doxsbf]/)){
                let maxLength = 0
                let minLength = 0

                // [最小フィールド幅]
                if (match.match(/[^\.]+[1-9][0-9]*[doxsbf]/)) {
                    let s = match.search(/[1-9][0-9]*[doxsbf]/)
                    minLength = Number(match.substring(s, match.length - 1))
                }
                // [最大フィールド幅] & [最小フィールド幅]
                else if(match.match(/[1-9][0-9]*\.[1-9][0-9]*[doxsbf]/)){
                    let sMax = match.search(/[1-9][0-9]*[doxsbf]/)
                    maxLength = Number(match.substring(sMax, match.length - 1))
                    
                    let minMatch = match.match(/[1-9][0-9]*\./)[0] // 必ずある想定
                    minLength = Number(minMatch.substring(0, minMatch.length - 1))
                }
                // [最大フィールド幅]
                else {
                    let sMax = match.search(/\.[1-9][0-9]*[doxsbf]/)
                    maxLength = Number(match.substring(sMax + 1, match.length - 1))
                }

                // 最初に入力の長さを制限
                if(maxLength > 0){
                    formatedArg = formatedArg.substr(0, maxLength)    
                }

                let repeatNum = minLength - formatedArg.length // パッドを繰り返すべき回数

                // 右寄せ
                if (match.match(/-[1-9][0-9]*(\.[1-9][0-9]*)?[doxsbf]/)) {
                    formatedArg = ' '.repeat(repeatNum > 0 ? repeatNum : 0) + formatedArg
                }
                // ゼロ埋め（&右詰め）
                else if(match.match(/0[1-9][0-9]*(\.[1-9][0-9]*)?[doxsbf]/)){
                    formatedArg = '0'.repeat(repeatNum > 0 ? repeatNum : 0) + formatedArg
                }
                // 左寄せ
                else {
                    formatedArg += ' '.repeat(repeatNum > 0 ? repeatNum : 0)
                }
            }

            // 書式指定子と置換
            let matchStartAt = str.search(match)
            str = str.substring(0, matchStartAt) + formatedArg + str.substring(matchStartAt + match.length)
        })
    })

    return str
}

