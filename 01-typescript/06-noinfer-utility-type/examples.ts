
/**
 * TYPESCRIPT 5.4
 * NOINFER<T> UTILITY TYPE
 */

// ==========================================
// 1. GENERIC RESULT TYPE
// ==========================================

type Result<T, E> =
    | {
        ok: true;
        value: T;
    }
    | {
        ok: false;
        error: E;
    };

// ==========================================
// 2. DEPLOYMENT FUNCTION
// ==========================================

function deployServerless<T extends string>(
    allowedRegions: readonly T[],
    targetRegion: NoInfer<T>
): Result<
    string,
    "invalid_region" | "network_error"
> {

    if (!allowedRegions.includes(targetRegion)) {
        return {
            ok: false,
            error: "invalid_region"
        };
    }

    console.log(`Deploying to ${targetRegion}`);

    return {
        ok: true,
        value: `Deployment successful in ${targetRegion}`
    };
}

// ==========================================
// 3. ALLOWED AWS REGIONS
// ==========================================

const allowedRegions = [
    "us-east-1",
    "eu-west-1",
    "ap-south-1"
] as const;

// ==========================================
// 4. VALID DEPLOYMENT
// ==========================================

const deployStatus = deployServerless(
    allowedRegions,
    "us-east-1"
);

console.log("Deployment result:", deployStatus);

// ==========================================
// 5. INVALID DEPLOYMENT
// ==========================================

// Uncomment to see the TypeScript error.

// deployServerless(
//     allowedRegions,
//     "us-eas-1"
// );

// ==========================================
// 6. FEATURE FLAG EXAMPLE
// ==========================================

const availableFeatures = [
    "dark_mode",
    "notifications",
    "analytics"
] as const;

function enableFeature<T extends string>(
    allowedFeatures: readonly T[],
    feature: NoInfer<T>
): void {
    console.log("Enabled feature:", feature);
}

enableFeature(availableFeatures, "dark_mode");

// ==========================================
// 7. USER ROLE EXAMPLE
// ==========================================

const allowedRoles = [
    "admin",
    "editor",
    "viewer"
] as const;

function assignRole<T extends string>(
    roles: readonly T[],
    role: NoInfer<T>
): void {
    console.log("Assigned role:", role);
}

assignRole(allowedRoles, "admin");

// ==========================================
// 8. MAIN
// ==========================================

function main(): void {
    console.log("TypeScript NoInfer examples");
    console.log("Result:", deployStatus);
}

main();
