export const SHOW_MSG = 'show-msg'
export const VIEW_MODE_CHANGE = 'view-mode-change'
export const VIEW_MODE_GET = 'view-mode-get'

function createEventEmitter() {
    const listenersMap = {}
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

export const eventBus = createEventEmitter()

export function showUserMsg(msg) {
    eventBus.emit(SHOW_MSG, msg)
}

export function showSuccessMsg(txt) {
    showUserMsg({ txt, type: 'success' })
}
export function showErrorMsg(txt) {
    showUserMsg({ txt, type: 'error' })
}
export function changeViewMode(newMode) {
    eventBus.emit(VIEW_MODE_CHANGE, newMode);
}

export function getViewMode(callback) {
    eventBus.on(VIEW_MODE_GET, callback)
}

window.showUserMsg = showUserMsg