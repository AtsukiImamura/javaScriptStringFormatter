# jsでも文字列フォーマットを
javascriptでjavaの `String.format()` のような機能を実現する

# Get Started
（WIP）

# Documents
### メソッド
~~~java Script
formatString(str, ...args)
~~~

```
str: フォーマットする文字列
args: フォーマットで使用する値の配列（可変長引数）
```


### 書式指定子の形式
```
%[インデックス][代替フォーム][フラグ][最小フィールド幅][.最大フィールド幅](書式)
```

### インデックス
~~~regex
/[1-9][0-9]*@/
~~~
の形式で記述する。

ここで指定したインデックスの内容が使われる。インデクスは慣例に従って０から始まる

##### 例
```
%2@d
12@f
```

### 代替フォーム
未実装。

|記法|内容|
|:--|:--|
|~#o~|~先頭に0をつけて出力する~|
|~#x~|~先頭に0xをつけて出力する~|

##### 例
```
%#o3d
%#x12x
```

### フラグ
以下のフラグをサポートする
|フラグ|内容|
|:--|:--|
|-|左詰めにする|
|0|左ゼロ詰めにする|

##### 例
```
%-4d
%-4s
```

### 最小フィールド幅
最低限確保される桁数。この数値以上の桁の値は全て出力される。文字列の場合は最小の文字数を指定することになり、不足分はデフォルトでは半角スペースで埋められる。

##### 例
```
%4d
%6s
```

### 最大フィールド幅
精度（最大表示幅）を指定する。この桁数より大きい場合は切り捨てられ、出力されない。文字列の場合は、最大長を指定することになる。

##### 例
```
%.4s
%5.4f
```


### 書式
以下の書式をサポートする

|書式|内容|
|:--|:--|
|d|整数を１０進数で表示。小数を与えた場合は切り捨てて表示する|
|o|整数を８進数で表示|
|x|整数を１６進数で表示|
|s|文字列|
|~b~|~真偽値~|
|f|小数点以下を含む数値|