
export const tableConfig = {
    border:'none',
    columns:[
        {
            title: '姓名',
            width: 80,
            align: 'center',
            field:'name'
        },
        {
            title: '年龄',
            width: 80,
            align: 'center',
            field:'age',
            sortable:true,
        },
        {
            title: '地址',
            align: 'center',
            field:'address'
        },
        {
            title: '生日',
            width: 80,
            align: 'center',
            field:'date',
            slots:{
                default:'date'
            }
        },
    ],
    rowConfig:{
        isHover:true
    },
    height:'100%'
}