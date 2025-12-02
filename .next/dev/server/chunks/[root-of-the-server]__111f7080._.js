module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/@prisma/client [external] (@prisma/client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}),
"[project]/src/server/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
;
const prismaClientSingleton = ()=>{
    return new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]();
};
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();
const __TURBOPACK__default__export__ = prisma;
if ("TURBOPACK compile-time truthy", 1) globalThis.prismaGlobal = prisma;
}),
"[project]/src/server/routes/auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hono$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/hono/dist/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hono$2f$dist$2f$hono$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/hono/dist/hono.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hono$2f$dist$2f$helper$2f$cookie$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/hono/dist/helper/cookie/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hono$2f$dist$2f$middleware$2f$jwt$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/hono/dist/middleware/jwt/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hono$2f$dist$2f$middleware$2f$jwt$2f$jwt$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/hono/dist/middleware/jwt/jwt.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hono$2f$zod$2d$validator$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@hono/zod-validator/dist/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/db.ts [app-route] (ecmascript)");
;
;
;
;
;
;
;
const auth = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hono$2f$dist$2f$hono$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Hono"]();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
const loginSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().email(),
    password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
});
auth.post('/login', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hono$2f$zod$2d$validator$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["zValidator"])('json', loginSchema), async (c)=>{
    const { email, password } = c.req.valid('json');
    const user = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].user.findUnique({
        where: {
            email
        }
    });
    if (!user) {
        return c.json({
            error: 'Invalid credentials'
        }, 401);
    }
    const isValid = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].compare(password, user.password);
    if (!isValid) {
        return c.json({
            error: 'Invalid credentials'
        }, 401);
    }
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24
    };
    const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hono$2f$dist$2f$middleware$2f$jwt$2f$jwt$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sign"])(payload, JWT_SECRET);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hono$2f$dist$2f$helper$2f$cookie$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setCookie"])(c, 'token', token, {
        httpOnly: true,
        secure: ("TURBOPACK compile-time value", "development") === 'production',
        sameSite: 'Strict',
        path: '/',
        maxAge: 60 * 60 * 24
    });
    return c.json({
        user: {
            id: user.id,
            email: user.email,
            role: user.role,
            name: user.name
        }
    });
});
auth.post('/logout', (c)=>{
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hono$2f$dist$2f$helper$2f$cookie$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setCookie"])(c, 'token', '', {
        httpOnly: true,
        secure: ("TURBOPACK compile-time value", "development") === 'production',
        sameSite: 'Strict',
        path: '/',
        maxAge: 0
    });
    return c.json({
        message: 'Logged out'
    });
});
const __TURBOPACK__default__export__ = auth;
}),
"[project]/src/server/middleware/auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authMiddleware",
    ()=>authMiddleware,
    "roleMiddleware",
    ()=>roleMiddleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hono$2f$dist$2f$helper$2f$cookie$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/hono/dist/helper/cookie/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hono$2f$dist$2f$middleware$2f$jwt$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/hono/dist/middleware/jwt/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hono$2f$dist$2f$middleware$2f$jwt$2f$jwt$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/hono/dist/middleware/jwt/jwt.js [app-route] (ecmascript)");
;
;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
async function authMiddleware(c, next) {
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hono$2f$dist$2f$helper$2f$cookie$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCookie"])(c, 'token');
    if (!token) {
        return c.json({
            error: 'Unauthorized'
        }, 401);
    }
    try {
        const payload = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hono$2f$dist$2f$middleware$2f$jwt$2f$jwt$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verify"])(token, JWT_SECRET);
        c.set('user', payload);
        await next();
    } catch (e) {
        return c.json({
            error: 'Unauthorized'
        }, 401);
    }
}
function roleMiddleware(allowedRoles) {
    return async (c, next)=>{
        const user = c.get('user');
        if (!user || !allowedRoles.includes(user.role)) {
            return c.json({
                error: 'Forbidden'
            }, 403);
        }
        await next();
    };
}
}),
"[project]/src/server/routes/users.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hono$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/hono/dist/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hono$2f$dist$2f$hono$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/hono/dist/hono.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hono$2f$zod$2d$validator$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@hono/zod-validator/dist/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$middleware$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/middleware/auth.ts [app-route] (ecmascript)");
;
;
;
;
;
;
const users = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hono$2f$dist$2f$hono$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Hono"]();
users.use('*', __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$middleware$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authMiddleware"]);
users.use('*', (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$middleware$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["roleMiddleware"])([
    'ADMIN'
]));
const createUserSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().email(),
    password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(6),
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    role: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'ADMIN',
        'SUPERVISOR',
        'OPERATOR',
        'CLIENT'
    ])
});
users.get('/', async (c)=>{
    const allUsers = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].user.findMany({
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            createdAt: true
        }
    });
    return c.json(allUsers);
});
users.post('/', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hono$2f$zod$2d$validator$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["zValidator"])('json', createUserSchema), async (c)=>{
    const { email, password, name, role } = c.req.valid('json');
    const existingUser = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].user.findUnique({
        where: {
            email
        }
    });
    if (existingUser) {
        return c.json({
            error: 'User already exists'
        }, 400);
    }
    const hashedPassword = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].hash(password, 10);
    const newUser = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].user.create({
        data: {
            email,
            password: hashedPassword,
            name,
            role
        },
        select: {
            id: true,
            email: true,
            name: true,
            role: true
        }
    });
    return c.json(newUser);
});
const __TURBOPACK__default__export__ = users;
}),
"[project]/src/server/routes/leads.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hono$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/hono/dist/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hono$2f$dist$2f$hono$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/hono/dist/hono.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hono$2f$zod$2d$validator$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@hono/zod-validator/dist/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$middleware$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/middleware/auth.ts [app-route] (ecmascript)");
;
;
;
;
;
const leads = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hono$2f$dist$2f$hono$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Hono"]();
leads.use('*', __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$middleware$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authMiddleware"]);
const createLeadSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().email(),
    phone: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    status: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'NEW',
        'CONTACTED',
        'QUALIFIED',
        'PROPOSAL',
        'NEGOTIATION',
        'WON',
        'LOST'
    ]).optional(),
    operatorId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
});
leads.get('/', async (c)=>{
    const allLeads = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].lead.findMany({
        include: {
            operator: {
                select: {
                    name: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return c.json(allLeads);
});
leads.post('/', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hono$2f$zod$2d$validator$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["zValidator"])('json', createLeadSchema), async (c)=>{
    const data = c.req.valid('json');
    const lead = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].lead.create({
        data
    });
    return c.json(lead);
});
leads.patch('/:id/status', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hono$2f$zod$2d$validator$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["zValidator"])('json', __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    status: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'NEW',
        'CONTACTED',
        'QUALIFIED',
        'PROPOSAL',
        'NEGOTIATION',
        'WON',
        'LOST'
    ])
})), async (c)=>{
    const id = c.req.param('id');
    const { status } = c.req.valid('json');
    const lead = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].lead.update({
        where: {
            id
        },
        data: {
            status
        }
    });
    return c.json(lead);
});
const __TURBOPACK__default__export__ = leads;
}),
"[project]/src/server/routes/products.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hono$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/hono/dist/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hono$2f$dist$2f$hono$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/hono/dist/hono.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hono$2f$zod$2d$validator$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@hono/zod-validator/dist/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$middleware$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/middleware/auth.ts [app-route] (ecmascript)");
;
;
;
;
;
const products = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hono$2f$dist$2f$hono$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Hono"]();
products.use('*', __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$middleware$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authMiddleware"]);
const createProductSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    price: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
    metadata: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].record(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any()).optional()
});
products.get('/', async (c)=>{
    const allProducts = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].product.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });
    return c.json(allProducts);
});
products.post('/', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hono$2f$zod$2d$validator$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["zValidator"])('json', createProductSchema), async (c)=>{
    const { name, price, metadata } = c.req.valid('json');
    const product = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].product.create({
        data: {
            name,
            price,
            metadata: metadata || {}
        }
    });
    return c.json(product);
});
const __TURBOPACK__default__export__ = products;
}),
"[project]/src/server/routes/clients.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hono$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/hono/dist/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hono$2f$dist$2f$hono$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/hono/dist/hono.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$middleware$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/middleware/auth.ts [app-route] (ecmascript)");
;
;
;
const clients = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hono$2f$dist$2f$hono$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Hono"]();
clients.use('*', __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$middleware$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authMiddleware"]);
clients.get('/', async (c)=>{
    const allClients = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].client.findMany({
        include: {
            user: {
                select: {
                    name: true,
                    email: true
                }
            },
            products: {
                include: {
                    product: true
                }
            }
        }
    });
    return c.json(allClients);
});
clients.get('/:id', async (c)=>{
    const id = c.req.param('id');
    const client = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].client.findUnique({
        where: {
            id
        },
        include: {
            user: {
                select: {
                    name: true,
                    email: true
                }
            },
            products: {
                include: {
                    product: true
                }
            },
            claims: true
        }
    });
    if (!client) return c.json({
        error: 'Client not found'
    }, 404);
    return c.json(client);
});
const __TURBOPACK__default__export__ = clients;
}),
"[project]/src/server/routes/claims.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hono$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/hono/dist/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hono$2f$dist$2f$hono$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/hono/dist/hono.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hono$2f$zod$2d$validator$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@hono/zod-validator/dist/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$middleware$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/middleware/auth.ts [app-route] (ecmascript)");
;
;
;
;
;
const claims = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hono$2f$dist$2f$hono$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Hono"]();
claims.use('*', __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$middleware$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authMiddleware"]);
const createClaimSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    title: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    clientId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
});
claims.get('/', async (c)=>{
    const allClaims = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].claim.findMany({
        include: {
            client: {
                include: {
                    user: {
                        select: {
                            name: true
                        }
                    }
                }
            },
            operator: {
                select: {
                    name: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return c.json(allClaims);
});
claims.post('/', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hono$2f$zod$2d$validator$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["zValidator"])('json', createClaimSchema), async (c)=>{
    const { title, description, clientId } = c.req.valid('json');
    const claim = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].claim.create({
        data: {
            title,
            description,
            clientId,
            status: 'SUBMITTED'
        }
    });
    return c.json(claim);
});
claims.patch('/:id/status', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hono$2f$zod$2d$validator$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["zValidator"])('json', __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    status: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'SUBMITTED',
        'IN_REVIEW',
        'RESOLVED'
    ])
})), async (c)=>{
    const id = c.req.param('id');
    const { status } = c.req.valid('json');
    const claim = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].claim.update({
        where: {
            id
        },
        data: {
            status
        }
    });
    return c.json(claim);
});
// Placeholder for S3 Presigned URL
claims.post('/upload-url', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hono$2f$zod$2d$validator$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["zValidator"])('json', __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    filename: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    contentType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
})), async (c)=>{
    const { filename, contentType } = c.req.valid('json');
    // In a real app, use AWS SDK to generate presigned URL
    // const command = new PutObjectCommand({ Bucket: '...', Key: filename, ContentType: contentType })
    // const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 })
    return c.json({
        uploadUrl: `https://fake-s3-url.com/${filename}`,
        publicUrl: `https://fake-s3-url.com/${filename}`
    });
});
const __TURBOPACK__default__export__ = claims;
}),
"[project]/src/server/app.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hono$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/hono/dist/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hono$2f$dist$2f$hono$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/hono/dist/hono.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hono$2f$dist$2f$middleware$2f$logger$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/hono/dist/middleware/logger/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hono$2f$dist$2f$middleware$2f$cors$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/hono/dist/middleware/cors/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hono$2f$dist$2f$middleware$2f$pretty$2d$json$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/hono/dist/middleware/pretty-json/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hono$2f$dist$2f$middleware$2f$secure$2d$headers$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/hono/dist/middleware/secure-headers/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hono$2f$dist$2f$middleware$2f$secure$2d$headers$2f$secure$2d$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/hono/dist/middleware/secure-headers/secure-headers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$routes$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/routes/auth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$routes$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/routes/users.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$routes$2f$leads$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/routes/leads.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$routes$2f$products$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/routes/products.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$routes$2f$clients$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/routes/clients.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$routes$2f$claims$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/routes/claims.ts [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
const app = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hono$2f$dist$2f$hono$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Hono"]().basePath('/api');
app.use('*', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hono$2f$dist$2f$middleware$2f$logger$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"])());
app.use('*', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hono$2f$dist$2f$middleware$2f$pretty$2d$json$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prettyJSON"])());
app.use('*', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hono$2f$dist$2f$middleware$2f$secure$2d$headers$2f$secure$2d$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["secureHeaders"])());
app.use('*', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hono$2f$dist$2f$middleware$2f$cors$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cors"])());
app.route('/auth', __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$routes$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]);
app.route('/users', __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$routes$2f$users$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]);
app.route('/leads', __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$routes$2f$leads$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]);
app.route('/products', __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$routes$2f$products$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]);
app.route('/clients', __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$routes$2f$clients$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]);
app.route('/claims', __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$routes$2f$claims$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]);
const __TURBOPACK__default__export__ = app;
}),
"[project]/src/app/api/[[...route]]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "PATCH",
    ()=>PATCH,
    "POST",
    ()=>POST,
    "PUT",
    ()=>PUT,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hono$2f$dist$2f$adapter$2f$vercel$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/hono/dist/adapter/vercel/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hono$2f$dist$2f$adapter$2f$vercel$2f$handler$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/hono/dist/adapter/vercel/handler.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$app$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/app.ts [app-route] (ecmascript)");
;
;
const runtime = 'nodejs' // Prisma needs nodejs runtime
;
const GET = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hono$2f$dist$2f$adapter$2f$vercel$2f$handler$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["handle"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$app$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]);
const POST = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hono$2f$dist$2f$adapter$2f$vercel$2f$handler$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["handle"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$app$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]);
const PUT = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hono$2f$dist$2f$adapter$2f$vercel$2f$handler$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["handle"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$app$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]);
const DELETE = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hono$2f$dist$2f$adapter$2f$vercel$2f$handler$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["handle"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$app$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]);
const PATCH = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hono$2f$dist$2f$adapter$2f$vercel$2f$handler$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["handle"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$app$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]);
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__111f7080._.js.map