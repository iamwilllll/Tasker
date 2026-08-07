import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { type LoginT } from '../../types';
import { loginWithGoogle, loginWithEmail } from '../../services/auth.service';
import { ErrorMessage } from '../../components';
import { useState } from 'react';

export function Login() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const { register, handleSubmit, formState } = useForm<LoginT>();

    const navigate = useNavigate();
    const onSubmit = async (data: LoginT) => {
        const res = await loginWithEmail(data);

        if (typeof res === 'object' && res !== null && 'error' in res) {
            setErrorMessage(res.message);

            const timer = setTimeout(() => {
                setErrorMessage('');
                clearTimeout(timer);
            }, 10000);

            if (res.code === 'auth/email-not-verified') {
                //? show message to user that email is not verified, redirect to login page and show option for resending verification email
            }

            return;
        }

        navigate('/dashboard', { replace: true });
        //? show successful message with res or any other relevant information console.log(res);
    };

    const inputClassName =
        'border-input-border bg-primary-surface focus:border-primary-text focus:ring-primary-text/10 w-full rounded-xl border px-4 py-3.5 text-[15px] outline-none transition focus:ring-4';

    return (
        <main className="bg-primary-surface font-primary text-primary-text relative min-h-screen overflow-hidden px-5 py-8 md:flex md:items-center md:px-10 md:py-12">
            <div className="relative mx-auto w-full max-w-xl md:grid md:max-w-6xl md:grid-cols-[minmax(0,1fr)_minmax(480px,540px)] md:items-center md:gap-14 lg:gap-24">
                <section className="hidden md:block">
                    <p className="text-muted-text mb-3 text-sm font-medium tracking-wide uppercase">
                        Your productivity workspace
                    </p>

                    <h1 className="m-0 max-w-xl text-4xl leading-tight font-bold tracking-tight lg:text-5xl">
                        Pick up where you left off.
                    </h1>

                    <p className="text-secondary-text mt-5 max-w-lg text-base leading-7 lg:text-lg">
                        Sign in to manage your tasks, review your progress and keep moving toward your goals.
                    </p>

                    <ul className="mt-8 space-y-4">
                        <li className="text-secondary-text flex items-center gap-3 text-sm">
                            <span className="border-task-border bg-task-surface flex size-7 shrink-0 items-center justify-center rounded-full border">
                                <svg aria-hidden="true" className="size-3.5" focusable="false">
                                    <use href="/sprite.svg#check-icon" />
                                </svg>
                            </span>
                            Access all your pending and completed tasks.
                        </li>

                        <li className="text-secondary-text flex items-center gap-3 text-sm">
                            <span className="border-task-border bg-task-surface flex size-7 shrink-0 items-center justify-center rounded-full border">
                                <svg aria-hidden="true" className="size-3.5" focusable="false">
                                    <use href="/sprite.svg#check-icon" />
                                </svg>
                            </span>
                            Continue working from any device.
                        </li>
                    </ul>
                </section>

                <section className="border-task-border bg-task-surface w-full rounded-2xl border p-5 shadow-xl sm:p-8 md:p-9">
                    <header className="mb-8">
                        <p className="text-muted-text mb-2 text-sm font-medium">Welcome back</p>

                        <h2 className="m-0 text-2xl font-bold tracking-tight sm:text-3xl">Log in to your account</h2>

                        <p className="text-secondary-text mt-2 text-sm">
                            Don&apos;t have an account?{' '}
                            <Link
                                to="/register"
                                className="text-primary-text font-semibold underline decoration-transparent underline-offset-4 transition hover:decoration-current"
                            >
                                Create one
                            </Link>
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

                        <div>
                            <div className="mb-2 flex items-center justify-between gap-4">
                                <label htmlFor="password" className="text-secondary-text block text-sm font-medium">
                                    Password
                                </label>

                                <Link
                                    to="/forgot-password"
                                    className="text-muted-text hover:text-primary-text text-sm font-medium transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            <input
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                placeholder="Enter your password"
                                aria-invalid={Boolean(formState.errors.password)}
                                className={inputClassName}
                                {...register('password', {
                                    required: 'Password is required',
                                })}
                            />

                            <div className="flex justify-between">
                                <ErrorMessage message={formState.errors.password?.message} />

                                {errorMessage && <ErrorMessage message={errorMessage} />}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={formState.isSubmitting}
                            className="bg-primary-text text-button-text mt-1 flex w-full cursor-pointer items-center justify-center rounded-xl px-5 py-3.5 text-[15px] font-semibold transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            {formState.isSubmitting ? 'Logging in...' : 'Log in'}
                        </button>

                        <div className="flex items-center gap-4 py-1">
                            <div className="bg-task-border h-px flex-1" />

                            <span className="text-muted-text text-xs font-medium">OR</span>

                            <div className="bg-task-border h-px flex-1" />
                        </div>

                        <button
                            type="button"
                            onClick={loginWithGoogle}
                            className="border-task-border hover:bg-primary-surface flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border px-5 py-3.5 text-[15px] font-medium transition-colors"
                        >
                            <svg aria-hidden="true" className="size-5" focusable="false">
                                <use href="/sprite.svg#google-icon" />
                            </svg>
                            Continue with Google
                        </button>
                    </form>

                    <p className="text-muted-text mt-6 text-center text-xs leading-5">
                        Your account information is securely protected.
                    </p>
                </section>
            </div>
        </main>
    );
}
