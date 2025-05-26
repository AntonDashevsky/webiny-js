import type { Component } from "~/sdk/types.js";

type Registration = { name: string; component: Component };

export class ComponentRegistry {
    private registry = new Map<string, Component>();
    private listeners = new Set<(reg: Registration) => void>();

    public register(component: Component) {
        const name = component.manifest.name;
        this.registry.set(name, component);
        // notify subscribers
        this.listeners.forEach(fn => fn({ name, component }));
    }

    public get(name: string) {
        return this.registry.get(name);
    }

    /** subscribe to *all* registrations */
    public onRegister(fn: (reg: Registration) => void) {
        this.listeners.add(fn);
        return () => this.listeners.delete(fn);
    }
}

export const componentRegistry = new ComponentRegistry();
