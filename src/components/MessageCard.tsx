import { FunctionalComponent } from "preact"

type MessageCard = {
    who: string
    what: string
    when: string
    onReply: () => void
    onDelete: () => void
  }
  
  export const MessageCard: FunctionalComponent<MessageCard> = ({ what, who, when }) => {
    return (
      <div class='border border-gray-300 rounded'>
        <div class='flex justify-between border-b border-b-gray-300 bg-gray-100 px-1 py-0.5 rounded-t text-gray-700'>
          <div>{who}</div><div>{new Date(when).toLocaleDateString("en", { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false })}</div>
        </div>
  
  
        <div class='m-1 text-gray-900 text-wrap truncate'><p>{what}</p></div>
  
      </div>
    )
  }