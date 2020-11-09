// import {isArray} from "../src/utils/dataType";
const isArray = obj => Object.prototype.toString.call(obj) === '[object Array]'

const config = [
  {
    label: '日期',
    prop: 'quantity'
  },
  {
    label: '配送信息',
    prop: 'quantity',
    children: [
      {
        label: '姓名',
        prop: 'quantity',
      },
      {
        label: '地址',
        prop: 'quantity',
        children: [
          {
            label: '省份',
            prop: 'quantity',
          },
          {
            label: '市区',
            prop: 'quantity',
          },
          {
            label: '地址',
            prop: 'quantity',
          },
          {
            label: '邮编',
            prop: 'quantity',
          },
        ]
      },
    ]
  },
]

// 判断有多个children > 0,就有几层
// 若第一层没有children 则占据最大行


// 1. 计算最大层数



let reuslt = []
let mDeep = 0

function fn(config) {
  let deep = 0
  let maxDeep = 0
  function getMaxDeep(thConfig) {
    deep++
    for (const configElement of thConfig) {
      if (isArray(configElement.children) && configElement.children.length > 0) {
        getMaxDeep(configElement.children)
      }
    }
    if (deep > maxDeep) {
      maxDeep = deep
      deep = 0
    }
  }
  getMaxDeep(config)
  if (maxDeep > mDeep) {
    mDeep = maxDeep
  }
  let deep1 = 0
  function getMaxDeep1(thConfig) {
    deep1 += thConfig.length
    for (const configElement of thConfig) {
      if (isArray(configElement.children) && configElement.children.length > 0) {
        getMaxDeep1(configElement.children)
      }
    }
  }

  for (let i = 0; i < config.length; i++) {
    const configElement = config[i]
    if (isArray(configElement.children) && configElement.children.length > 0) {
      getMaxDeep1(configElement.children)
      deep1 = deep1 - i
      configElement.colspan = deep1
      configElement.rowspan = 1
      fn(configElement.children)
    } else {
      configElement.rowspan = maxDeep
      configElement.colspan = 1
    }
  }
}

fn(config)

for (let j = 0; j < mDeep; j++) {
  if (j === 0) {
    for (let i = 0; i < config.length; i++) {
      const configElement = config[i]
      if (!reuslt[j]) {
        reuslt[j] = [{
          label: configElement.label,
          rowspan: configElement.rowspan,
          colspan: configElement.colspan,
        }]
      } else {
        reuslt[j].push({
          label: configElement.label,
          rowspan: configElement.rowspan,
          colspan: configElement.colspan,
        })
      }
    }
  } else {
    for (let i = 0; i < config.length; i++) {
      const configElement = config[i]
      if (isArray(configElement.children) && configElement.children.length > 0) {
        if (!reuslt[j]) {
          reuslt[j] = [{
            label: configElement.label,
            rowspan: configElement.rowspan,
            colspan: configElement.colspan,
          }]
        } else {
          reuslt[j].push({
            label: configElement.label,
            rowspan: configElement.rowspan,
            colspan: configElement.colspan,
          })
        }
      }
    }
  }
}

// console.log(JSON.stringify(config, 2, 2))
console.log(JSON.stringify(reuslt, 2, 2))
