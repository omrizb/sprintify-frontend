
import { useEffect, useRef, useState } from 'react'
import { eventBusService } from '../services/event-bus.service.js'

export function UserMsg() {

    const [msg, setMsg] = useState(null)
    const timeoutIdRef = useRef()

    useEffect(() => {
        const unsubscribe = eventBusService.on('show-user-msg', (msg) => {
            setMsg(msg)
            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current)
                timeoutIdRef.current = null
            }
            timeoutIdRef.current = setTimeout(closeMsg, 5000)
        })
        return unsubscribe
    }, [])

    function closeMsg() {
        setMsg(null)
    }

    const msgClass = msg ? `${msg.type} show` : ''
    return (
        <div className={`user-msg ${msgClass}`} onClick={closeMsg}>
            {msg && <span>{msg.txt}</span>}
        </div>
    )
}
