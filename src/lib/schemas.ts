import * as z from "zod";

export const InstantFormSchema = z.object({
    email: z.string().email(),
});

export type InstantFormSchemaType = z.infer<typeof InstantFormSchema>;
