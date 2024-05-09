import {onBeforeMount, onMounted, reactive, ref, watch} from "vue";

export default function useTableList(tableConfig:{}){
    const GridOptions = ref({})

    // 加载数据
    function loadData(searchParams={}){
        setTimeout(()=>{
            GridOptions.value.data = [
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
        GridOptions.value = tableConfig
        loadData()
    }
    tableConfig && initTable()
    return{
        GridOptions,
        loadData,
    }
}