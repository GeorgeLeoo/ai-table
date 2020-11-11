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




// let mDeep = 0
//
// function fn(config) {
//   let deep = 0
//   let maxDeep = 0
//   function getMaxDeep(thConfig) {
//     deep++
//     for (const configElement of thConfig) {
//       if (isArray(configElement.children) && configElement.children.length > 0) {
//         getMaxDeep(configElement.children)
//       }
//     }
//     if (deep > maxDeep) {
//       maxDeep = deep
//       deep = 0
//     }
//   }
//   getMaxDeep(config)
//   if (maxDeep > mDeep) {
//     mDeep = maxDeep
//   }
//   let deep1 = 0
//   function getMaxDeep1(thConfig) {
//     deep1 += thConfig.length
//     for (const configElement of thConfig) {
//       if (isArray(configElement.children) && configElement.children.length > 0) {
//         getMaxDeep1(configElement.children)
//       }
//     }
//   }
//
//   for (let i = 0; i < config.length; i++) {
//     const configElement = config[i]
//     if (isArray(configElement.children) && configElement.children.length > 0) {
//       getMaxDeep1(configElement.children)
//       deep1 = deep1 - i
//       configElement.colspan = deep1
//       configElement.rowspan = 1
//       fn(configElement.children)
//     } else {
//       configElement.rowspan = maxDeep
//       configElement.colspan = 1
//     }
//   }
// }
//
// fn(config)

// let maxDeep = 0
// function getDeep(_root) {
//   let _maxDeep = 0
//   for (let i = 0; i < _root.length; i++) {
//     if (isArray(_root[i].children) && _root[i].children.length > 0) {
//       _maxDeep += getDeep(_root[i].children)
//     }
//   }
//   console.log(_maxDeep)
//   return _maxDeep
// }
// let deep = getDeep(config)
// console.log('last', deep)

/**
 * 删除对象的某些属性
 * @param obj
 * @param removeKeys
 * @returns {{}}
 */
function removeObjectByKeys(obj, removeKeys) {
  const result = {}
  for (const key in obj) {
    if (!removeKeys.includes(key)) {
      result[key] = obj[key]
    }
  }
  return result
}

let reuslt = []

/**
 * 层序遍历
 * @param root
 */
function levelOrder(root) {
  // 队列
  const queue = []
  // 当前的层数
  let deep = 0

  function _levelOrder(_root) {
    if (!isArray(_root) || _root.length === 0) {
      return
    }
    // 遍历
    for (let i = 0; i < _root.length; i++) {
      if (isArray(_root[i].children) && _root[i].children.length > 0) {
        // 若有children则将其入队
        queue.push(_root[i].children)
      }
      // 并且将本元素加入result中
      if (!isArray(reuslt[deep])) {
        reuslt[deep] = []
      }
      const item = _root[i]
      reuslt[deep].push(removeObjectByKeys(item, ['children']))
    }
  }

  // 先调用一次，保证队列中有数据的可能，这样下面的循环才能执行
  _levelOrder(root)

  // 遍历出队，并继续遍历下一曾的数据
  while (queue.length > 0) {
    let front = null
    // 出队
    front = queue.shift()
    // 深度+1
    deep++
    _levelOrder(front)
  }
}

levelOrder(config)


// console.log(JSON.stringify(config, 2, 2))
console.log(JSON.stringify(reuslt, 2, 2))
