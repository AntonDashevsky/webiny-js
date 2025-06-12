import { makeAutoObservable, toJS, runInAction, observable } from "mobx";
import type { GenericRecord } from "@webiny/app/types.js";
import { scheduleMicroTask } from "./scheduleMicroTask.js";

export type MutableState<T> = T;

export interface IState<TState> {
    read(): TState;
    update(cb: (state: MutableState<TState>) => void): void;
    setState(setter: (state: MutableState<TState>) => TState): void;
    toJson(): TState;
}

export class State<TState extends GenericRecord = GenericRecord> implements IState<TState> {
    private activeState: TState;
    private pendingState: TState | undefined;

    constructor(initialState: TState) {
        this.activeState = initialState;
        makeAutoObservable(this, {
            // @ts-ignore 123
            activeState: observable
        });
    }

    read(): TState {
        return this.pendingState || this.activeState;
    }

    update(cb: (state: MutableState<TState>) => void) {
        if (!this.pendingState) {
            this.pendingState = structuredClone(this.activeState);
            this.commitPendingState();
        }

        cb(this.pendingState);
    }

    updateInPlace(cb: (state: MutableState<TState>) => void) {
        cb(this.activeState);
    }

    setState(setter: (state: MutableState<TState>) => TState) {
        this.activeState = observable(setter(this.activeState));
    }

    toJson() {
        return toJS(this.activeState);
    }

    private commitPendingState() {
        scheduleMicroTask(() => {
            runInAction(() => {
                if (this.pendingState) {
                    this.activeState = observable(this.pendingState);
                    this.pendingState = undefined;
                }
            });
        });
    }
}
