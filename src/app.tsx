import { MessagesBox } from './components/MessagesBox'
import { InputBox } from './components/InputBox'
import { useSignal } from '@preact/signals'
import { useEffect } from 'preact/hooks'
import { supabase } from './supabase'
import { RealtimePresenceState } from '@supabase/supabase-js'


function onlyUnique(value: string, index: number, array: string[]) {
  return array.indexOf(value) === index;
}

const mapPresenceState = (state: RealtimePresenceState) => {
  return Object.keys(state)
    .map(presenceId => {
      const presences = state[presenceId] as unknown as {
        user: string
      }[]

      return presences.map(presence => presence.user)
    })
    .flat()
    .filter(onlyUnique)
}

export function App() {
  const who = useSignal<string | undefined>(undefined)

  const whos = useSignal<string[]>([])
  const userStatus = useSignal<{
    user: string,
    online_at: string,
  } | undefined>(who.value ? { user: who.value, online_at: new Date().toISOString() } : undefined)

  useEffect(() => {
    const room = supabase.channel('room_01')

    room
      .on('presence', { event: 'sync' }, () => {
        const newState = room.presenceState()
        whos.value = mapPresenceState(newState)
        console.log('new state:', newState)
      })
      .subscribe(async (status) => {
        if (status !== 'SUBSCRIBED' || !who.value) { return }

        userStatus.value = { user: who.value, online_at: new Date().toISOString() }

        if (userStatus.value) {
          await room.track(userStatus.value)
        }
      })

    return () => {
      if (userStatus.value) {
        room.untrack(userStatus.value)
      }
      room.unsubscribe()
    }
  }, [who.value])

  return (
    <div class='h-dvh flex flex-row justify-between p-1'>
      <MessagesBox />
      <div class='flex flex-col justify-between pt-2'>
        <div class='flex flex-wrap gap-2'>
          {whos.value.length > 0 && <span>Here now:</span>} {whos.value.map(w => <span class='px-1 border border-gray-300'>{w}</span>)}
        </div>
        <InputBox who={who} />
      </div>

    </div>
  )
}




