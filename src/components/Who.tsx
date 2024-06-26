import { FunctionalComponent } from "preact"
import { useEffect } from "preact/hooks"
import { useSignal } from '@preact/signals'
import Cookies from 'js-cookie'

type WhoProps = {
    onGetWho: (who: string) => void
}

export const Who: FunctionalComponent<WhoProps> = ({ onGetWho }) => {
    const input = useSignal<string>('')

    useEffect(() => {
        const whoFromStorage = Cookies.get('who')

        console.log('whoFromStorage: ', whoFromStorage)
        if (whoFromStorage) onGetWho(whoFromStorage)
    }, [])

    useEffect(() => {
        const handleWhoInput = (e: KeyboardEvent) => {
            if (((e.ctrlKey || e.metaKey) && e.key === 'Enter') || e.key === 'Enter') {
                onGetWho(input.value)
                Cookies.set('who', input.value)
            }
        }
        document.addEventListener('keydown', handleWhoInput)
        return () => {
            document.removeEventListener('keydown', handleWhoInput)
        }
    })

    return (
        <div class='w-full h-full flex flex-col items-center justify-center gap-5 mb-[700px]'>
            <span class='text-xl'>Who?</span>
            <input autoFocus class='input text-xl' type='text' value={input.value} onInput={e => input.value = e.currentTarget.value} />
        </div>
    )
}
