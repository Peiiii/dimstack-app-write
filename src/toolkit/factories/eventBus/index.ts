import { createFreeEventBus,FreeEventBus } from "./freeEventBus";

export const createEventBus = createFreeEventBus;

export type EventBus = FreeEventBus;