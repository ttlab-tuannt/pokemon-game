import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

export const initExampleForm = () => {
    const formValues = {
        email: 'example@example.com',
        password: 'P@$$w0Rd',
    };

    const { handleSubmit, isSubmitting } = useForm({
        initialValues: formValues,
    });

    const onSubmit = handleSubmit((values) => {
        alert(JSON.stringify(values, null, 2));

        // Send stuff to the API
    });

    const { value: email, errorMessage: emailError } = useField(
        'email',
        yup.string().required(),
    );
    const { value: password, errorMessage: passwordError } = useField(
        'password',
        yup.string().required().min(8),
    );

    return {
        onSubmit,
        isSubmitting,
        email,
        password,
        emailError,
        passwordError,
    };
};
