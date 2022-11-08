import { EVENTS, PATH_NAMES } from '../app.constants'

interface IState {
    [key: string]: {
        next: string
    }
}

function buildStateMachine () : IState {
    return {
        [EVENTS.HAS_DRIVING_LICENSE]: {
            next: `${PATH_NAMES.ID_CHECK_APP}`,
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