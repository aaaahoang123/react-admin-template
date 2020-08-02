abstract class BaseFormState<FormType = any, IdType = number> {
    data: FormType = this?.getInitForm?.() as FormType;
    requesting = false;
    id?: IdType;

    /**
     * Return an instance of FormType
     */
    abstract getInitForm?(): FormType;
}

export default BaseFormState;
