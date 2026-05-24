type Listener = (data: any) => void;

export class DomainEvents {
  private static listeners: Map<string, Listener[]> = new Map();

  static subscribe(event: string, callback: Listener) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)?.push(callback);
  }

  static dispatch(event: string, data: any) {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach(callback => callback(data));
    }
  }
}

// Nombres de eventos constantes
export const APP_EVENTS = {
  PAYMENT_APPROVED: 'PAYMENT_APPROVED',
  USER_BLOCKED: 'USER_BLOCKED',
  USER_ROLE_CHANGED: 'USER_ROLE_CHANGED',
};