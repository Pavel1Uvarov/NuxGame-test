import { useForm } from 'vee-validate';
import { object, string } from 'yup';

export function useLoginForm() {
  const { handleSubmit, defineField, errors } = useForm({
    validationSchema: object({
      username: string().required(),
      phone: string()
        .required()
        .test('phone', `Invalid phone number`, (v) => (!v ? true : /^[\dx\W]+$/.test(v))),
    }),
  });

  return { handleSubmit, defineField, errors };
}
