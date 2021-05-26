export interface IHandler {
    canHandle(gateway: String);

    handle(topic: string, fn: string, state: string);
}
