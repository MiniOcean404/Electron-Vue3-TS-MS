module.exports = {
	useTabs: true, // 使用tab缩进，默认false
	tabWidth: 2, // tab缩进大小,默认为2
	semi: false, // 使用分号, 默认true
	printWidth: 120, // 超过最大值换行
	singleQuote: true, // 使用单引号, 默认false(在jsx中配置无效, 默认都是双引号)
	bracketSpacing: true, //对象中的空格 默认true
	endOfLine: 'auto', //结尾是 \n \r \n\r auto
	htmlWhitespaceSensitivity: 'ignore',
	TrailingCooma: 'none', // 行尾逗号,默认none,可选 none|es5|all es5 包括es5中的数组、对象 all 包括函数对象等所有可选
	arrowParens: 'avoid', // 箭头函数参数括号 默认avoid 可选 avoid| always avoid 能省略括号的时候就省略 例如x => x always 总是有括号
	jsxSingleQuote: false, // 在jsx中使用单引号代替双引号,
	jsxBracketSameLine: true, //JSX标签闭合位置 默认false
	// false: <div
	//          className=""
	//          style={{}}
	//       >
	// true: <div
	//          className=""
	//          style={{}} >
	eslintIntegration: false, //不让prettier使用eslint的代码格式进行校验
	stylelintIntegration: false, //不让prettier使用stylelint的代码格式进行校验
	tslintIntegration: false // 不让prettier使用tslint的代码格式进行校验
}
