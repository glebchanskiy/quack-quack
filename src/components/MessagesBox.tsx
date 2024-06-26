import { useSignal } from '@preact/signals'
import { useEffect, useRef } from 'preact/hooks'
import { supabase } from '../supabase'
import { Message } from '../supabase/types'
import { MessageCard } from './MessageCard'

export const MessagesBox = () => {
    const messages = useSignal<Message[]>([])
    const ref = useRef<HTMLDivElement>(null)
  
    useEffect(() => {
      const channels = supabase.channel('new-messages-channel')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'Kryakochka' },
          (payload) => {
              const m =  payload.new as Message
              messages.value = [...messages.value, m]
          }
        )
        .subscribe()

      supabase.from('Kryakochka').select()
        .then(response => {
          if (response.data) messages.value = response.data
        })
    }, [])
  
    useEffect(() => {
      if (!ref.current) return
  
      ref.current.lastElementChild?.scrollIntoView({ behavior: 'instant' })
  
    }, [messages.value])
  
    useEffect(() => {
        const goDown = (e: KeyboardEvent) => {
            if (!ref.current) return
            if (e.key === 'ArrowDown') {
                ref.current.lastElementChild?.scrollIntoView({ behavior: 'smooth' })
            }
        } 
        document.addEventListener('keydown', goDown)

        return () => {
            document.removeEventListener('keydown', goDown)
        }
    })
  
  
    return (
      <div ref={ref} class='h-dvh overflow-auto flex flex-col gap-2 p-2'>
  
        {messages.value.map(m => <MessageCard {...m} onReply={() => { }} onDelete={() => { }} />)}
  
      </div>
    )
  }