import { FormInputLabel, Input, Group } from './form-input.styles.js';

const FormInput = ({ label, ...others }) => (
	<Group className='group'>
		<Input className='form-input' {...others} />
		{label ? (
			<FormInputLabel shrink={others.value.length} className={`${others.value.length ? 'shrink' : ''} form-input-label`}>{label}</FormInputLabel>
		) : null}
	</Group>
);

export default FormInput;
