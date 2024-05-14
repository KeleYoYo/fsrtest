import {ref} from "vue";
import {$getPersonQuestions} from "@/api/questionApi";


export default function usePersonQuestions() {
    const personQuestion = ref([])

    async function getQuestions() {
        let res = await $getPersonQuestions()
        personQuestion.value = res.data.map(item => {
            return {
                label: item.personQuestionContent,
                value: item.personQuestionContent
            }
        })
    }

    // $getRoomQuestions().then(res => {
    //     console.log("RoomQuestions",res)
    //     questionState.treeQuestions = res.data.map(item => {
    //         return {
    //             label:item.roomQuestionContent,
    //             value:item.roomQuestionContent
    //         }
    //     })
    // })
    getQuestions()
    return {personQuestion}
}