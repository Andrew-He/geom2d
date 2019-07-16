/**
 * @file factory.js
 * @author andrew he 
 */

export default const Factory = {
    registeredTypes: new Map(),

    register(clzName, clz) {
        Factory.registeredTypes.set(clzName, clz);
        return Factory;
    },

    create(clzName, ...args) {
        if (!Factory.registeredTypes.has(clzName)) {
            throw new Error(`Error when create: Class type ${clzName} does not exist`);
        }
        let currentClass = Factory.registeredTypes.get(clzName);
        return new currentClass(...args);
    }
}
