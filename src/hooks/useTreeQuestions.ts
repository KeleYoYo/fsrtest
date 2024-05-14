import {ref} from "vue";
import {$getTreeQuestions} from "@/api/questionApi";


export default function useTreeQuestions() {
    const treeQuestion = ref([])

    async function getQuestions() {
        let res = await $getTreeQuestions()
        treeQuestion.value = res.data.map(item => {
            return {
                label: item.treeQuestionContent,
                value: item.treeQuestionContent
            }
        })
    }

    getQuestions()
    return {treeQuestion}
}