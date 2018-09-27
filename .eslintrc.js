module.exports = {
    "parserOptions": {
        "ecmaVersion": 6, //ECMA版本
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
            "impliedStrict": true
        }
    },
    env: { //运行环境
        "es6": true,
        "node": true
    },
    parser: "babel-eslint", //用于ES6语法，必须
    rules: { //规则列表
        indent: [2, 4, {
            "SwitchCase": 1
        }], //4个空格缩进
        'comma-style': ["error", "first", {
            exceptions: {
                "ArrayExpression": true,//忽略数据和对象字面的逗号格式
                "ObjectExpression": true
            }
        }],
        semi: [2, "never"],          //不使用分号结尾
        "no-floating-decimal": [2], //填写完整的小位数
    }
}