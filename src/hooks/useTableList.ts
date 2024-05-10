import {onBeforeMount, onMounted, reactive, ref, watch} from "vue";

export default function useTableList(tableConfig:{}){
    const tableState = reactive({
        gridOptions:{}
    })

    // 加载数据
    function loadData(searchParams={}){
        setTimeout(()=>{
            tableState.gridOptions.data = [
                {
                    name: 'John Brown',
                    age: 18,
                    address: 'New York No. 1 Lake Park',
                    date: '2016-10-03',
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: 'London No. 1 Lake Park',
                    date: '2016-10-01',
                },
                {
                    name: 'Joe Black',
                    age: 30,
                    address: 'Sydney No. 1 Lake Park',
                    date:'2022-10-03'
                }
            ]
        },0)
    }

    // 初始化表格
    function initTable(){
        tableState.gridOptions= tableConfig
        loadData()
    }
    tableConfig && initTable()
    return{
        tableState,
        loadData,
    }
}