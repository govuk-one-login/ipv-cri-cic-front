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