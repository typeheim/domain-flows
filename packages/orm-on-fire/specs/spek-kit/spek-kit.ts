import {
    ScopeAction,
    SpecScope,
} from './utils/contracts'
import * as FirebaseAdmin from 'firebase-admin'
import { OrmOnFire } from '../../src/singletons'

async function SetUpFirebase() {
    let keyOrPath = process?.env?.FL_ACCESS_KEY ?? process.cwd() + '/firestore.key.json'
    if (process?.env?.FL_ACCESS_KEY) {
        keyOrPath = JSON.parse(process?.env?.FL_ACCESS_KEY)
    }

    FirebaseAdmin.initializeApp({
        credential: FirebaseAdmin.credential.cert(keyOrPath),
        databaseURL: 'https://fire-legion.firebaseio.com',
    })
    // @ts-ignore - there is no error but TS can't compile
    OrmOnFire.driver = FirebaseAdmin.firestore()
}

export const SpecKit = {
    prepareScope: (): SpecScope => {
        return {
            fixtures: {},
        }
    },

    setUpFixtures: (executionScope: SpecScope, action: ScopeAction) => {
        return async (done) => {
            await SetUpFirebase()
            await action(executionScope, done)
        }
    },

    runScopeAction: (executionScope: SpecScope, action: ScopeAction) => {
        return async (done) => {
            await action(executionScope, done)
        }
    },

    runAsyncAction: (action: (done?) => void) => {
        return async (done) => {
            await action(done)
        }
    },
}
