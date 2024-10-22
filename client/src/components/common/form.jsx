



// src/components/common/form.jsx
// src/components/common/form.jsx
// import React from 'react';
import PropTypes from 'prop-types';
import Label from '../ui/label'; // Assuming default export
import Input from '../ui/input';
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from '../ui/select';
import Textarea from '../ui/textarea';
import Button from '../ui/button';

function CommonForm({
    formControls,
    formData,
    setFormData,
    onSubmit,
    buttonText = "Submit",
    isBtnDisabled , // If you choose to handle it differently
}) {
    // Handle input changes
    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const renderInputsByComponentType = (getControlItem) => {
        const value = formData[getControlItem.name] || "";

        switch (getControlItem.componentType) {
            case "input":
                return (
                    <Input
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.name}
                        type={getControlItem.type}
                        value={value}
                        onChange={(event) =>
                            handleChange(getControlItem.name, event.target.value)
                        }
                    />
                );

            case "select":
                return (
                    <Select
                        onValueChange={(val) => handleChange(getControlItem.name, val)}
                        value={value}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={getControlItem.label} />
                        </SelectTrigger>

                        <SelectContent>
                            {getControlItem.options && getControlItem.options.length > 0
                                ? getControlItem.options.map((optionItem) => (
                                    <SelectItem key={optionItem.id} value={optionItem.id}>
                                        {optionItem.label}
                                    </SelectItem>
                                ))
                                : null}
                        </SelectContent>
                    </Select>
                );

            case "textarea":
                return (
                    <Textarea
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.id}
                        value={value}
                        onChange={(event) =>
                            handleChange(getControlItem.name, event.target.value)
                        }
                    />
                );

            default:
                return (
                    <Input
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.name}
                        type={getControlItem.type}
                        value={value}
                        onChange={(event) =>
                            handleChange(getControlItem.name, event.target.value)
                        }
                    />
                );
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-3">
                {formControls.map((controlItem) => (
                    <div className="grid w-full gap-1.5" key={controlItem.name}>
                        <Label className="mb-1" htmlFor={controlItem.name}>
                            {controlItem.label}
                        </Label>
                        {renderInputsByComponentType(controlItem)}
                    </div>
                ))}
            </div>
            <Button disabled={isBtnDisabled} type="submit" className="mt-2 w-full">
                {buttonText}
            </Button>
        </form>
    );
}

CommonForm.propTypes = {
    formControls: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            placeholder: PropTypes.string,
            componentType: PropTypes.oneOf(["input", "select", "textarea"]).isRequired,
            type: PropTypes.string, // For input type
            options: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string.isRequired,
                    label: PropTypes.string.isRequired,
                })
            ),
        })
    ).isRequired,
    formData: PropTypes.object.isRequired,
    setFormData: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    buttonText: PropTypes.string,
    isBtnDisabled: PropTypes.bool,
};

export default CommonForm;

