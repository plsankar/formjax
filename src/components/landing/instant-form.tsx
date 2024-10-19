"use client";

import { Form, SubmitHandler, useForm } from "react-hook-form";
import { InstantFormSchema, InstantFormSchemaType } from "@/lib/schemas";
import React, { useState, useTransition } from "react";

import { submitInstantForm } from "@/actions/guest";
import { zodResolver } from "@hookform/resolvers/zod";

const InstantForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<InstantFormSchemaType>({ resolver: zodResolver(InstantFormSchema) });

    const [result, setResult] = useState<Awaited<ReturnType<typeof submitInstantForm>> | null>(null);

    const [isPending, startTransition] = useTransition();

    const onSubmit: SubmitHandler<InstantFormSchemaType> = async (data) => {
        startTransition(async () => {
            console.log(data);
            const _result = await submitInstantForm(data);
            setResult(_result);
            if (_result.success) {
                reset();
            }
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mt-6 border grid gap-10 p-10 max-w-lg gap-x-4">
                <div>
                    <label htmlFor="email-address" className="sr-only">
                        mail addressE
                    </label>
                    <input id="email-address" type="email" autoComplete="email" required placeholder="email" {...register("email")} disabled={isSubmitting} />
                    {errors.email ? <span>{errors.email.message}</span> : null}
                </div>
                <button type="submit" disabled={isSubmitting}>
                    {isPending ? "submitting" : "submit"}
                </button>
                {result ? <>{result.message ? <span>{result.message}</span> : null}</> : null}
            </div>
        </form>
    );
};

export default InstantForm;
