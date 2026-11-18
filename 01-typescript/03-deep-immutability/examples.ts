// Deep Immutability & Configuration Management

type AppConfig = {
  API: {
    endpoint: string;
    retries: number;
  };
  activeFeatures: string[];
};

// Teaching version for plain data objects and arrays.
type DeepReadonly<T> = {
  readonly [P in keyof T]:
    T[P] extends object
      ? DeepReadonly<T[P]>
      : T[P];
};

const globalConfig: DeepReadonly<AppConfig> = {
  API: {
    endpoint: "https://api.v1",
    retries: 3
  },
  activeFeatures: ["NewDashboard"]
};

// Expected TypeScript errors:
// globalConfig.API.retries = 0;
// globalConfig.activeFeatures.push("AdminBypass");
// globalConfig.activeFeatures[0] = "NewFeature";

// Static inline configuration:
const instantConfig = {
  API: {
    endpoint: "https://api.v1",
    retries: 3
  },
  activeFeatures: ["NewDashboard"]
} as const;

// Expected TypeScript errors:
// instantConfig.API.retries = 0;
// instantConfig.activeFeatures.push("AdminBypass");

// Runtime deep freeze for plain objects and arrays.
function deepFreeze<T>(
  value: T,
  seen = new WeakSet<object>()
): T {
  if (
    value === null ||
    (typeof value !== "object" && typeof value !== "function")
  ) {
    return value;
  }

  const obj = value as object;

  if (seen.has(obj)) return value;
  seen.add(obj);

  for (const key of Reflect.ownKeys(obj)) {
    const descriptor = Object.getOwnPropertyDescriptor(obj, key);

    if (descriptor && "value" in descriptor) {
      deepFreeze(descriptor.value, seen);
    }
  }

  return Object.freeze(obj);
}

const runtimeConfig = deepFreeze({
  server: { port: 3000 },
  features: ["payments", "analytics"]
});

console.log(runtimeConfig.server.port);
