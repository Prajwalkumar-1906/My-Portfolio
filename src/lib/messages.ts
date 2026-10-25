export interface DirectMessage {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  phone?: string;
  purpose: string;
  subject?: string;
  message: string;
  deliveredVia: "direct_web" | "web3forms" | "local_store";
}

// In-memory message store surviving server hot-reloads
declare global {
  var __prajwal_messages__: DirectMessage[] | undefined;
}

const getStore = (): DirectMessage[] => {
  if (!globalThis.__prajwal_messages__) {
    globalThis.__prajwal_messages__ = [
      {
        id: "msg_init_1",
        timestamp: new Date().toISOString(),
        name: "Welcome Dispatch",
        email: "pkm.digi@gmail.com",
        purpose: "System",
        subject: "Direct Messaging System Online",
        message: "Direct website messaging is active. Visitors can reach Prajwal directly through the on-site messaging console.",
        deliveredVia: "direct_web"
      }
    ];
  }
  return globalThis.__prajwal_messages__;
};

export function saveMessage(msg: Omit<DirectMessage, "id" | "timestamp">): DirectMessage {
  const store = getStore();
  const newMsg: DirectMessage = {
    ...msg,
    id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toISOString()
  };
  store.unshift(newMsg);
  if (store.length > 200) {
    store.pop();
  }
  return newMsg;
}

export function getAllMessages(): DirectMessage[] {
  return getStore();
}

export function getPublicMessages(): Array<Omit<DirectMessage, "email" | "phone"> & { maskedEmail: string }> {
  return getStore()
    .filter((m) => m.purpose !== "System")
    .map((m) => {
      const parts = m.email.split("@");
      const user = parts[0] || "user";
      const domain = parts[1] || "example.com";
      const masked = user.length > 2 ? `${user[0]}***${user[user.length - 1]}@${domain}` : `***@${domain}`;
      return {
        id: m.id,
        timestamp: m.timestamp,
        name: m.name,
        maskedEmail: masked,
        purpose: m.purpose,
        subject: m.subject,
        message: m.message,
        deliveredVia: m.deliveredVia
      };
    });
}
