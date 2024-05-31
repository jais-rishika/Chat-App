import { TextField } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import PropTypes from "prop-types"

CustomTextField.propTypes={
    name: PropTypes.string,
    helperText: PropTypes.node
}

export default function CustomTextField({name,helperText,...other}){
const {control } =useFormContext();
return(
    <Controller

        name={name}
        control={control}
        render={({field,fieldState:{error}})=>(
            <TextField 
                {...field}
                fullWidth 
                error={!!error}
                helperText={error? error.message : helperText}
                {...other} />
        )}
   />
)
}