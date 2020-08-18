<template>
  <div v-if="value>0 && show">
    <v-chart :forceFit="true" height="200" :data="data" padding="0">
      <!-- <v-tooltip /> -->
      <v-facet type="rect" :showTitle="false" :eachView="eachView" />
    </v-chart>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 100
    },
    value: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      show: false,
      data: [{
        type: '当前',
        value: this.value
      }],
      eachView: (view, facet) => {
        const data = facet.data
        data.push({
          type: '其他',
          value: this.total - this.value
        })
        view.source(data)
        view.coord('theta', {
          radius: 0.8,
          innerRadius: 0.5
        })
        view.intervalStack().position('value').color('type', ['#0a9afe', '#eceef1']).opacity(1)
        view.guide().html({
          position: ['50%', '50%'],
          html: `<div class="g2-guide-html"><p class="value">${this.value}人</p></div>`
        })
      }
    }
  },
  watch: {
    value(val) {
      this.data[0].value = val
    }
  },
  methods: {
    setStyle() {
      const id = 'legend-html'
      if (document.getElementById(id)) {
        return
      }
      const styleTxt = `
        .g2-guide-html {
            width: 50px;
            height: 50px;
            vertical-align: middle;
            text-align: center;
            line-height: 50px;
        }

        .g2-guide-html .title {
            font-size: 12px;
            color: #8c8c8c;
            font-weight: 300;
        }

        .g2-guide-html .value {
            font-size: 18px;
            color: #000;
            font-weight: bold;
            margin-bottom: 0;
            height: 50px;
            line-height: 50px;
        }
      `
      const style = document.createElement('style')
      style.setAttribute('id', id)
      style.innerHTML = styleTxt
      document.getElementsByTagName('head')[0].appendChild(style)
    }
  },
  mounted() {
    setTimeout(() => {
      this.setStyle()
      this.show = true
    }, 50)
  }
}
</script>
