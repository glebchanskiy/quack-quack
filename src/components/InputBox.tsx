import { useEffect, useRef } from "preact/hooks"
import { supabase } from "../supabase"
import { Message } from "../supabase/types"
import { Signal } from '@preact/signals'
import { Who } from "./Who"
import Cookies from 'js-cookie'
import { FunctionalComponent } from "preact"

type MessageReq = Omit<Message, 'id' | 'when'>
const send = ({ who, what, replyId }: MessageReq) => {
    supabase.from('kryakochka').insert({ who, what, replyId }).select().then(_ignore => { })
}


export const InputBox: FunctionalComponent<{who: Signal<string | undefined>}> = ({who}) => {
  
    const ref = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        const handleWhoInput = (e: KeyboardEvent) => {
            if (e.shiftKey) return
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                if (!who.value || who.value.length === 0 || !ref.current || ref.current.value.length === 0) return
                send({ who: who.value, what: ref.current.value, replyId: null })
                ref.current.value = ''
            }
        }
        document.addEventListener('keydown', handleWhoInput)
        return () => {
            document.removeEventListener('keydown', handleWhoInput)
        }
    })

    useEffect(() => {
        if (ref.current) {
            ref.current.focus()
        }
    }, [who.value])

    return (
        <div class='flex flex-col min-w-[500px]'>
            {!who.value && <Who onGetWho={gotcha => who.value = gotcha} />}
            {who.value &&
                <div class='mt-auto border border-gray-200 rounded'>
                    <textarea ref={ref} rows={20} class='flex p-1 focus:!outline-none w-full resize-none rounded' type="text" />
                    <div onClick={() => {
                        who.value = undefined
                        Cookies.remove('who')
                    }} class='flex bg-gray-100 border-t justify-center border-gray-300 cursor-pointer'>
                        <div>{who.value}</div>
                    </div>
                </div>
            }

        </div>
    )
}