import { z as zod } from "zod";

const userSchema = zod.object({
	email: zod.string().email(),
	password: zod.string().min(6),
	name: zod.optional(zod.string().min(3)),
});

type User = zod.infer<typeof userSchema>;

export { User };
