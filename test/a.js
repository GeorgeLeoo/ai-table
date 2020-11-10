// 写个函数 把 config 转换为 final
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

const final = [
  [
    {
      label: '日期',
      rowspan: 3,
      colspan: 1,
    },
    {
      label: '配送信息',
      rowspan: 1,
      colspan: 5,
    },
  ],
  [
    {
      label: '姓名',
      rowspan: 2,
      colspan: 1,
    },
    {
      label: '地址',
      rowspan: 1,
      colspan: 4,
    },
  ],
  [
    {
      label: '省份',
      rowspan: 1,
      colspan: 1,
    },
    {
      label: '市区',
      rowspan: 1,
      colspan: 1,
    },
    {
      label: '地址',
      rowspan: 1,
      colspan: 1,
    },
    {
      label: '邮编',
      rowspan: 1,
      colspan: 1,
    },
  ],
]


let a = [
  [
    [
      {},
      {}
    ],
    [],
  ]
]
