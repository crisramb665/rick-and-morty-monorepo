//! THIS IS A DECORATOR
// Using CommonJs sintaxis in order to use decorators in runtime
// Use it to measure and print execution time of the queries to te console 
export function MeasureExecutionTime() {
  return function (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    const originalMethod = descriptor.value

    descriptor.value = async function (...args: any[]) {
      const start = Date.now()
      const result = await originalMethod.apply(this, args)
      const end = Date.now()

      console.log(`⏱️ ${propertyKey} executed in ${end - start}ms`)
      return result
    }

    return descriptor
  }
}
