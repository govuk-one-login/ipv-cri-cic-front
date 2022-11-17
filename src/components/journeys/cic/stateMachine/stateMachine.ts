import { EVENTS, PATH_NAMES } from '../app.constants'

interface IState {
    [key: string]: {
        next: string
    }
}

function buildStateMachine () : IState {
    return {
        [EVENTS.SELECTED_UK_PASSPORT]: {
            next: `${PATH_NAMES.PASSPORT_DETAILS}`,
        },
        [EVENTS.SELECTED_OTHER_PASSPORT]: {
            next: `${PATH_NAMES.PASSPORT_DETAILS}`,
        },
        [EVENTS.SELECTED_BRP]: {
            next: `${PATH_NAMES.BRP_DETAILS}`,
        },
        [EVENTS.SELECTED_UK_PHOTOCARD_DL]: {
            next: `${PATH_NAMES.PHOTOCARD_DL_DETAILS}`,
        },
        [EVENTS.SELECTED_OTHER_PASSPORT]: {
            next: `${PATH_NAMES.OTHER_PASSPORT_DETAILS}`
        }
    }
}

export function getNext(event: string) : string {
    const stateMachine = buildStateMachine()
    if (!stateMachine[event]) {
        throw new Error("Invalid event passed to the state machine")
    }
    return `${stateMachine[event].next}`
}