export const divInputSytle = "flex justify-center items-center pb-3";

export const divSelectInputStyle = "w-full flex justify-center items-center space-x-2";

export const selectStyle = "bg-gray-100 flex w-42 justify-center items-center p-1";
export const Input = ({
    placeholder,
    name,
    id,
    setValue
}) => {

    const inputClass = "bg-gray-100 w-80 h-10 rounded-sm shadow-sm shadow-gray-200 p-4";

    return(
        <div 
            className={divInputSytle}
        >
            <input 
                placeholder={placeholder}
                name={name}
                id={id}
                className={inputClass}
                onChange={(e)=> 
                    setValue(e.target.value)
                }
            />
        </div>
    );
}

export const SelectInput =({
    name,
    id,
    setValue,
    key,
    options
}) => {

    return(
        <div className={divInputSytle}>
            <div className={divSelectInputStyle}>
                <select 
                    name={name} 
                    id={id}
                    key={key}
                    className={selectStyle}
                    onChange={(e) => setValue(e.target.value)}
                >
                    {
                        options.map(
                            (opt,index) => {
                                return(
                                    <option 
                                        value={opt.value}
                                        key={index}
                                    >
                                        {opt.name}
                                    </option>
                                );
                            }
                        )
                    }
                </select>
            </div> 
        </div>
    );
}