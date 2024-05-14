import {ref} from "vue";
import {$getRoomQuestions} from "@/api/questionApi";


export default function useRoomQuestions() {
    const roomQuestion = ref([])

    async function getQuestions() {
        let res = await $getRoomQuestions()
        roomQuestion.value = res.data.map(item => {
            return {
                label: item.roomQuestionContent,
                value: item.roomQuestionContent
            }
        })
    }

    getQuestions()
    return {roomQuestion}
}