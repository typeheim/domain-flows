import 'reflect-metadata'
import { Metadata } from '../singletons'
import { EntityMetadata, PropertyMetadata } from '../Contracts/EntityMetadata'

export function Aggregate(metadata?: EntityMetadata): ClassDecorator {
    return Entity(metadata)
}

export function Entity(metadata?: EntityMetadata): ClassDecorator {
    return (target: any): void => {
        if (!metadata) {
            metadata = {
                collection: convertClassNameToKebabCase(target.prototype.constructor.name),
            }
        } else if (!metadata.collection) {
            metadata.collection = convertClassNameToKebabCase(target.prototype.constructor.name)
        }

        Metadata.entity(target).add(metadata)
    }
}

export function Field(metadata?: PropertyMetadata): PropertyDecorator {
    return (target: Object, propertyKey: string | symbol): void => {
        if (!metadata) {
            metadata = {
                name: propertyKey.toString()
            }
        } else if (!metadata.name) {
            metadata.name = propertyKey.toString()
        }
        Metadata.entity(target).addField(metadata)
    }
}

export function ID(): PropertyDecorator {
    return (target: Object, propertyKey: string | symbol): void => {
        // @TODO add support for setting custom names of id
    }
}


export function DocRef(entity: any): PropertyDecorator {
    return (target: Object, propertyKey: string | symbol): void => {
        Metadata.entity(target).addDocRef({
            fieldName: propertyKey.toString(),
            entity: entity
        })
    }
}

export function CollectionRef(entity: any): PropertyDecorator {
    return (target: Object, propertyKey: string | symbol): void => {
        Metadata.entity(target).addCollectionRef({
            fieldName: propertyKey.toString(),
            entity: entity
        })
    }
}

function convertClassNameToKebabCase(className: string) {
    const regexp = /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
    return className.match(regexp)
                    .map(s => s.toLowerCase())
                    .join('-')
}
