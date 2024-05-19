import { Children } from "react";
import { FormProvider as Form } from "react-hook-form";
import PropTypes from "prop-types"


const FormProvider =({methods,onSubmit,children})=>{
    return(
        <Form {...methods}>
            <form onSubmit={onSubmit}>{children}</form>
        </Form>
    )
}

FormProvider.propTypes={
    method: PropTypes.object,
    onSubmit: PropTypes.func,
    children: PropTypes.node
}
export default FormProvider;