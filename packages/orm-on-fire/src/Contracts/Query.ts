import * as firebase from 'firebase'
import WhereFilterOp = firebase.firestore.WhereFilterOp

export interface FireFilter<Entity> {
    equal(value: any): FireFilter<Entity>

    greaterThen(value: any): FireFilter<Entity>

    lessThen(value: any): FireFilter<Entity>

    greaterThenOrEqual(value: any): FireFilter<Entity>

    lessThenOrEqual(value: any): FireFilter<Entity>

    in(list: any): FireFilter<Entity>

    contain(value: any): FireFilter<Entity>

    containAnyOf(list: any): FireFilter<Entity>
}

export interface FieldCondition {
    fieldName: string
    operator: WhereFilterOp
    compareValue: any
}

export interface QueryState {
    conditions?: FieldCondition[]
    limit?: number
}
