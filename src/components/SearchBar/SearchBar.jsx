import { Field, Form, Formik } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import css from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
  const handleSubmit = (values, actions) => {
    if (values.search.trim() === '') {
      toast.error('The search field cannot be empty!');
      return;
    }
    onSubmit(values.search.trim().toLowerCase());
    actions.resetForm();
  };

  return (
    <>
      <header className={css.header}>
        <Formik initialValues={{ search: '' }} onSubmit={handleSubmit}>
          <Form>
            <Field
              className={css.inputSearch}
              type="text"
              name="search"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
            <button type="submit">Search</button>
          </Form>
        </Formik>
      </header>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default SearchBar;
