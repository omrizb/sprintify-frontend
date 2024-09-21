export const SHOW_MSG = 'show-user-msg'
export const SHOW_TOOLTIP = 'show-tooltip'

function createEventEmitter() {
    const listenersMap = {}

    // DEBUG
    // window.listenersMap = listenersMap

    return {
        on(evName, listener) {
            listenersMap[evName] = (listenersMap[evName]) ? [...listenersMap[evName], listener] : [listener]
            return () => {
                listenersMap[evName] = listenersMap[evName].filter(func => func !== listener)
            }
        },
        emit(evName, data) {
            if (!listenersMap[evName]) return
            listenersMap[evName].forEach(listener => listener(data))
        }
    }
}

export const eventBusService = createEventEmitter()

export function showSuccessMsg(txt) {
    showUserMsg({ txt, type: 'success' })
}
export function showErrorMsg(txt) {
    showUserMsg({ txt, type: 'error' })
}

function showUserMsg(msg) {
    eventBusService.emit(SHOW_MSG, msg)
}

export function showTooltip(props) {
    eventBusService.emit(SHOW_TOOLTIP, props)
}

window.showUserMsg = showUserMsg