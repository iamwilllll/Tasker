import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useForm, useWatch } from 'react-hook-form';
import { loginWithGoogle as registerWithGoogle, registerWithEmail } from '../../services/googleAuth.service';
import { ErrorMessage } from '../../components';
import { type RegisterT } from '../../types';

export function Register() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const { register, handleSubmit, control, formState } = useForm<RegisterT>();
    const password = useWatch({ control, name: 'password' });

    const navigate = useNavigate();
    const onSubmit = async (data: RegisterT) => {
        const res = await registerWithEmail(data);

        if (typeof res === 'object' && res !== null && 'error' in res) {
            setErrorMessage(res.message);

            const timer = setTimeout(() => {
                setErrorMessage('');
                clearTimeout(timer);
            }, 10000);

            return;
        }

        navigate('/login', { replace: true });
        //? show successful message with the response from the registration API or any other relevant information console.log(res)
    };

    const inputClassName =
        'border-input-border bg-primary-surface focus:border-primary-text focus:ring-primary-text/10 w-full rounded-xl border px-4 py-3.5 text-[15px] outline-none transition focus:ring-4';

    return (
        <main className="bg-primary-surface font-primary text-primary-text relative min-h-screen overflow-hidden px-5 py-8 md:flex md:items-center md:px-10 md:py-12">
            <div
                aria-hidden="true"
                className="bg-task-surface absolute -top-32 -left-32 hidden size-96 rounded-full blur-3xl md:block"
            />

            <div
                aria-hidden="true"
                className="border-task-border absolute right-12 bottom-12 hidden size-52 rounded-full border md:block"
            />

            <div className="relative mx-auto w-full max-w-xl md:grid md:max-w-6xl md:grid-cols-[minmax(0,1fr)_minmax(480px,540px)] md:items-center md:gap-14 lg:gap-24">
                <section className="hidden md:block">
                    <p className="text-muted-text mb-3 text-sm font-medium tracking-wide uppercase">
                        Your productivity workspace
                    </p>

                    <h1 className="m-0 max-w-xl text-4xl leading-tight font-bold tracking-tight lg:text-5xl">
                        Turn your plans into completed tasks.
                    </h1>

                    <p className="text-secondary-text mt-5 max-w-lg text-base leading-7 lg:text-lg">
                        Create an account to organize your day, keep track of your progress and stay focused on what matters.
                    </p>

                    <ul className="mt-8 space-y-4">
                        <li className="text-secondary-text flex items-center gap-3 text-sm">
                            <span className="border-task-border bg-task-surface flex size-7 shrink-0 items-center justify-center rounded-full border">
                                <svg aria-hidden="true" className="size-3.5" focusable="false">
                                    <use href="/sprite.svg#check-icon" />
                                </svg>
                            </span>
                            Keep pending and completed tasks organized.
                        </li>

                        <li className="text-secondary-text flex items-center gap-3 text-sm">
                            <span className="border-task-border bg-task-surface flex size-7 shrink-0 items-center justify-center rounded-full border">
                                <svg aria-hidden="true" className="size-3.5" focusable="false">
                                    <use href="/sprite.svg#check-icon" />
                                </svg>
                            </span>
                            Access your workspace from any device.
                        </li>
                    </ul>
                </section>

                <section className="border-task-border bg-task-surface w-full rounded-2xl border p-5 shadow-xl sm:p-8 md:p-9">
                    <header className="mb-8">
                        <p className="text-muted-text mb-2 text-sm font-medium">Get started for free</p>

                        <h2 className="m-0 text-2xl font-bold tracking-tight sm:text-3xl">Create your account</h2>

                        <p className="text-secondary-text mt-2 text-sm">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="text-primary-text font-semibold underline decoration-transparent underline-offset-4 transition hover:decoration-current"
                            >
                                Log in
                            </Link>
                        </p>
                    </header>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="min-w-0">
                                <label htmlFor="name" className="text-secondary-text mb-2 block text-sm font-medium">
                                    Name
                                </label>

                                <input
                                    id="name"
                                    type="text"
                                    autoComplete="given-name"
                                    placeholder="John"
                                    aria-invalid={Boolean(formState.errors.name)}
                                    className={inputClassName}
                                    {...register('name', {
                                        required: 'Name is required',
                                        minLength: {
                                            value: 2,
                                            message: 'Use at least 2 characters',
                                        },
                                    })}
                                />

                                <ErrorMessage message={formState.errors.name?.message} />
                            </div>

                            <div className="min-w-0">
                                <label htmlFor="lastName" className="text-secondary-text mb-2 block text-sm font-medium">
                                    Last name
                                </label>

                                <input
                                    id="lastName"
                                    type="text"
                                    autoComplete="family-name"
                                    placeholder="Doe"
                                    aria-invalid={Boolean(formState.errors.lastName)}
                                    className={inputClassName}
                                    {...register('lastName', {
                                        required: 'Last name is required',
                                        minLength: {
                                            value: 2,
                                            message: 'Use at least 2 characters',
                                        },
                                    })}
                                />

                                <ErrorMessage message={formState.errors.lastName?.message} />
                            </div>
                        </div>

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
                            <label htmlFor="password" className="text-secondary-text mb-2 block text-sm font-medium">
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                autoComplete="new-password"
                                placeholder="At least 6 characters"
                                aria-invalid={Boolean(formState.errors.password)}
                                className={inputClassName}
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters',
                                    },
                                })}
                            />

                            <ErrorMessage message={formState.errors.password?.message} />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="text-secondary-text mb-2 block text-sm font-medium">
                                Confirm password
                            </label>

                            <input
                                id="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                placeholder="Repeat your password"
                                aria-invalid={Boolean(formState.errors.confirmPassword)}
                                className={inputClassName}
                                {...register('confirmPassword', {
                                    required: 'Please confirm your password',
                                    validate: (value) => value === password || 'Passwords do not match',
                                })}
                            />

                            <div className="flex justify-between">
                                <ErrorMessage message={formState.errors.confirmPassword?.message} />

                                {errorMessage && <ErrorMessage message={errorMessage} />}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={formState.isSubmitting}
                            className="bg-primary-text text-button-text mt-1 flex w-full cursor-pointer items-center justify-center rounded-xl px-5 py-3.5 text-[15px] font-semibold transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            {formState.isSubmitting ? 'Creating account...' : 'Create account'}
                        </button>

                        <div className="flex items-center gap-4 py-1">
                            <div className="bg-task-border h-px flex-1" />

                            <span className="text-muted-text text-xs font-medium">OR</span>

                            <div className="bg-task-border h-px flex-1" />
                        </div>

                        <button
                            type="button"
                            onClick={registerWithGoogle}
                            className="border-task-border hover:bg-primary-surface flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border px-5 py-3.5 text-[15px] font-medium transition-colors"
                        >
                            <svg aria-hidden="true" className="size-5" focusable="false">
                                <use href="/sprite.svg#google-icon" />
                            </svg>
                            Continue with Google
                        </button>
                    </form>

                    <p className="text-muted-text mt-6 text-center text-xs leading-5">
                        By creating an account, you agree to our terms and privacy policy.
                    </p>
                </section>
            </div>
        </main>
    );
}
