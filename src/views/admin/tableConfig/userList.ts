export const userList = {
    border: 'none',
    columns: [
        {
            title: '用户名',
            width: 120,
            align: 'center',
            field: 'userName',
        },
        {
            title: '角色',
            width: 120,
            align: 'center',
            field: 'userRole',
            slots: {
                default: 'userRole'
            }
        },
        {
            title: '姓名',
            width: 120,
            align: 'center',
            field: 'userNickName',
        },
        {
            title: '年龄',
            width: 120,
            align: 'center',
            field: 'userAge',
            slots: {
                default: 'userAge'
            }
        },
        {
            title: '住址',
            align: 'center',
            field: 'userAddress',
        },
        {
            title: '操作',
            align: 'center',
            field: 'action',
            width: 120,
            slots: {
                default: 'action'
            }
        },
    ],
    rowConfig: {
        isHover: true
    },
    height: '100%'
}