export interface Message {
    id: number
    who: string
    what: string
    when: string
    replyId: number | null
}