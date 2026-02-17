const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

export const isEmail = (input: string | undefined): boolean =>
	!!input && emailRegex.test(input);

export const validatePassword = (value?: string): boolean =>
	!!value && passwordRegex.test(value);

export const isEqual = (a?: string, b?: string): boolean =>
	!!a && !!b && a === b;
