import { TextField ,Stack} from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import PropTypes, { number } from "prop-types"
import { useRef } from "react";


export default function CustomCodeField({keyName="",inputs=[],...others}){
const coderef=useRef(null);
const {control} =useFormContext();

const handleChangeWithNextField = (event, handleChange) => {
    const { maxLength, value, name } = event.target;
    
    //replaces code1(name) with 1(fieldIndex) removing code(keyname)
    const fieldIndex = name.replace(keyName, "");
    

    const fieldIntIndex = Number(fieldIndex);

    const nextfield = document.querySelector(
        `input[name="${keyName}${fieldIntIndex + 1}"]`
      );

    if (value.length > maxLength) {
      event.target.value = value[0];
    }
    
    if (value.length >= maxLength && fieldIntIndex < 6 && nextfield !== null) {
      nextfield.focus();
    }

    handleChange(event);
  };
return(
    //tell why ref is used
    <Stack direction="row" spacing={2} justifyContent="center" ref={coderef}>
    {inputs.map((name,index)=>(

        <Controller
            key={name}
            name={`${keyName}${index+1}`}
            control={control}
            render={({field,fieldState:{error}})=>(
                <TextField 
                    {...field} 
                    error={!!error}
                    autoFocus={index===0}
                    placeholder="-"
                    onChange={(event)=>{handleChangeWithNextField(event,field.onChange);}}
                    onFocus={(event)=>{event.currentTarget.select()}}
                    InputProps={{
                        sx:{
                            width:{ xs: 36, sm: 56 },
                            height:{ xs: 36, sm: 56 },
                            "& input": {p:0, textAlign: "center"}

                        }
                    }}
                    inputProps={{
                        maxLength: 1,
                        type: "number"
                    }}
                    {...others}
                 />
                
            )}
    />
    ))}
    </Stack>
)
}