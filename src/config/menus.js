const menus = [{
        title: '首页``',
        icon: 'home',
        key: '1',
        path: '/'
    },
    {
        title: '商品',
        icon: 'appstore',
        key: '2',
        children: [{
                title: '分类管理',
                icon: 'bars',
                key: '3',
                path: '/category'
            },
            {
                title: '商品管理',
                icon: 'tool',
                key: '4',
                path: '/product'
            }
        ]
    },
    {
        title: '用户管理',
        icon: 'user',
        key: '5',
        path:'/user'
    },
    {
        title: '权限管理',
        icon: 'safety-certificate',
        key: '6',
        path: '/role'
    },
    {
        title: '图形图表',
        icon: 'area-chart',
        key: '7',
        children: [{
                title: '柱状图',
                icon: 'bar-chart',
                key: '8',
                path: '/charts/bar'
            },
            {
                title: '饼状图`',
                icon: 'pie-chart',
                key: '9',
                path: '/charts/pie'
            },
            {
                title: '折线图`',
                icon: 'line-chart',
                key: '10',
                path: '/charts/line'
            }
        ]
    }
]
export default menus;