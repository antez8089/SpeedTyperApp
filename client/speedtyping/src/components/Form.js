import React, { useState } from 'react';

const Form = ({ fields, onSubmit }) => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.id]: field.value || '' }), {})
  );

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col justify-center gap-6 p-4 max-w-96'>
        {fields.map((field) => (
        <div key={field.id} className='flex flex-col gap-1.5'>
            <label htmlFor={field.id} className='text-white'>
                {field.label}
            </label>
            <input
            className='p-1'
            type={field.type}
            id={field.id}
            value={formData[field.id]}
            onChange={handleChange}
            />
        </div>
        ))}
        <button
        type="submit"
        className='bg-sky-600 p-2 text-white hover:bg-sky-700 cursor-pointer'
        >
            Submit
        </button>
    </form>
  );
};

export default Form;