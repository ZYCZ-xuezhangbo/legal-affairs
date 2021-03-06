const path = require('path')
const webpack = require('webpack')
const ThemeColorReplacer = require('webpack-theme-color-replacer')
const buildDate = JSON.stringify(new Date().toLocaleString())
const createThemeColorReplacerPlugin = require('./config/plugin.config')
const { modifyVars } = require('./src/config/theme')

function resolve(dir) {
	return path.join(__dirname, dir)
}

const isProd = process.env.NODE_ENV === 'production'

const assetsCDN = {
	// webpack build externals
	externals: {
		vue: 'Vue',
		'vue-router': 'VueRouter',
		vuex: 'Vuex',
		axios: 'axios'
	},
	css: [],
	// https://unpkg.com/browse/vue@2.6.10/
	js: [
		'//cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js',
		'//cdn.jsdelivr.net/npm/vue-router@3.1.3/dist/vue-router.min.js',
		'//cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.min.js',
		'//cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js'
	]
}

// vue.config.js
const vueConfig = {
	configureWebpack: {
		plugins: [
			new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
			new ThemeColorReplacer({
				fileName: 'css/theme-colors.css'
			}),
			new webpack.DefinePlugin({
				APP_VERSION: `"${require('./package.json').version}"`,
				BUILD_DATE: buildDate
			})
		],
		// if prod, add externals
		externals: isProd ? assetsCDN.externals : {}
	},
	chainWebpack: (config) => {
		config.resolve.alias.set('@$', resolve('src'))

		const svgRule = config.module.rule('svg')
		svgRule.uses.clear()
		svgRule.oneOf('inline')
			.resourceQuery(/inline/)
			.use('vue-svg-icon-loader')
			.loader('vue-svg-icon-loader')
			.end()
			.end()
			.oneOf('external')
			.use('file-loader')
			.loader('file-loader')
			.options({
				name: 'assets/[name].[hash:8].[ext]'
			})

		// if prod is on
		// assets require on cdn
		if (isProd) {
			config.plugin('html').tap(args => {
				args[0].cdn = assetsCDN
				return args
			})
		}
	},
	css: {
		loaderOptions: {
			less: {
				modifyVars: modifyVars(),
				// DO NOT REMOVE THIS LINE
				javascriptEnabled: true
			}
		}
	},
	devServer: {
		port: 8000,
		proxy: {
			'/api': {
				target: 'http://192.168.18.98:8055',
				// target: 'http://47.98.58.218:8055',
				ws: false,
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	},
	// disable source map in production
	productionSourceMap: false,
	lintOnSave: undefined,
	// babel-loader no-ignore node_modules/*
	transpileDependencies: []
}

// preview.pro.loacg.com only do not use in your production;
if (process.env.VUE_APP_PREVIEW === 'true') {
	console.log('VUE_APP_PREVIEW', true)
	// add `ThemeColorReplacer` plugin to webpack plugins
	vueConfig.configureWebpack.plugins.push(createThemeColorReplacerPlugin())
}

module.exports = vueConfig
