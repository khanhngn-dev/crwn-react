import { FC, InputHTMLAttributes } from 'react';
import { FormInputLabel, Input, Group } from './form-input.styles';

type FormInputProps = {
	label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({ label, ...others }) => (
	<Group className='group'>
		<Input className='form-input' {...others} />
		{label ? (
			<FormInputLabel
				shrink={Boolean(others.value && typeof others.value === 'string' && others.value.length)}
				className={`${
					Boolean(others.value && typeof others.value === 'string' && others.value.length)
						? 'shrink'
						: ''
				} form-input-label`}
			>
				{label}
			</FormInputLabel>
		) : null}
	</Group>
);

export default FormInput;
