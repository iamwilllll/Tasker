import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { ErrorMessage } from '../../components';
import { forgotPasswordWithEmail } from '../../services/auth.service';
import { type ForgotPasswordT } from '../../types';

export function ForgotPassword() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const { register, handleSubmit, formState } = useForm<ForgotPasswordT>();

    const onSubmit = async (data: ForgotPasswordT) => {
        setErrorMessage(null);

        const res = await forgotPasswordWithEmail({ email: data.email });

        if (typeof res === 'object' && res !== null && 'error' in res) {
            setErrorMessage(res.message);

            const timer = setTimeout(() => {
                setErrorMessage(null);
                clearTimeout(timer);
            }, 10000);

            return;
        }

        //? show successful message with res or any other relevant information
    };

    const inputClassName =
        'border-input-border bg-primary-surface focus:border-primary-text focus:ring-primary-text/10 w-full rounded-xl border px-4 py-3.5 text-[15px] outline-none transition focus:ring-4';

    return (
        <main className="bg-primary-surface font-primary text-primary-text relative min-h-screen overflow-hidden px-5 py-8 md:flex md:items-center md:px-10 md:py-12">
            <div className="relative mx-auto w-full max-w-xl md:grid md:max-w-6xl md:grid-cols-[minmax(0,1fr)_minmax(480px,540px)] md:items-center md:gap-14 lg:gap-24">
                <section className="hidden md:block">
                    <p className="text-muted-text mb-3 text-sm font-medium tracking-wide uppercase">Account recovery</p>

                    <h1 className="m-0 max-w-xl text-4xl leading-tight font-bold tracking-tight lg:text-5xl">
                        Get back into your account.
                    </h1>

                    <p className="text-secondary-text mt-5 max-w-lg text-base leading-7 lg:text-lg">
                        Don&apos;t worry if you forgot your password. We&apos;ll help you reset it and get you back to your
                        workspace.
                    </p>

                    <ul className="mt-8 space-y-4">
                        <li className="text-secondary-text flex items-center gap-3 text-sm">
                            <span className="border-task-border bg-task-surface flex size-7 shrink-0 items-center justify-center rounded-full border">
                                <svg aria-hidden="true" className="size-3.5" focusable="false">
                                    <use href="/sprite.svg#check-icon" />
                                </svg>
                            </span>
                            Reset your password securely.
                        </li>

                        <li className="text-secondary-text flex items-center gap-3 text-sm">
                            <span className="border-task-border bg-task-surface flex size-7 shrink-0 items-center justify-center rounded-full border">
                                <svg aria-hidden="true" className="size-3.5" focusable="false">
                                    <use href="/sprite.svg#check-icon" />
                                </svg>
                            </span>
                            Receive a password reset link by email.
                        </li>
                    </ul>
                </section>

                <section className="border-task-border bg-task-surface w-full rounded-2xl border p-5 shadow-xl sm:p-8 md:p-9">
                    <header className="mb-8">
                        <p className="text-muted-text mb-2 text-sm font-medium">Password recovery</p>

                        <h2 className="m-0 text-2xl font-bold tracking-tight sm:text-3xl">Forgot your password?</h2>

                        <p className="text-secondary-text mt-2 text-sm">
                            Enter your email and we&apos;ll send you a link to reset your password.
                        </p>
                    </header>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                        <div>
                            <label htmlFor="email" className="text-secondary-text mb-2 block text-sm font-medium">
                                Email address
                            </label>

                            <input
                                id="email"
                                type="email"
                                autoComplete="email"
                                placeholder="you@example.com"
                                aria-invalid={Boolean(formState.errors.email)}
                                className={inputClassName}
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: 'Please enter a valid email address',
                                    },
                                })}
                            />

                            <ErrorMessage message={formState.errors.email?.message} />
                        </div>

                        {errorMessage && <ErrorMessage message={errorMessage} />}

                        <button
                            type="submit"
                            disabled={formState.isSubmitting}
                            className="bg-primary-text text-button-text mt-1 flex w-full cursor-pointer items-center justify-center rounded-xl px-5 py-3.5 text-[15px] font-semibold transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            {formState.isSubmitting ? 'Sending link...' : 'Send reset link'}
                        </button>

                        <Link
                            to="/login"
                            className="text-muted-text hover:text-primary-text text-center text-sm font-medium transition-colors"
                        >
                            Back to login
                        </Link>
                    </form>

                    <p className="text-muted-text mt-6 text-center text-xs leading-5">
                        Your account information is securely protected.
                    </p>
                </section>
            </div>
        </main>
    );
}
