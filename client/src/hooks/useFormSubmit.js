import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const useFormSubmit = (url, navigateTo, onSuccess) => {
  const navigate = useNavigate();

  return async (values, actions) => {
    try {
      const result = await axios.post(url, JSON.stringify(values), {
        headers: { "Content-Type": "application/json" },
      });
      actions.resetForm();
      onSuccess && onSuccess(result);
      navigateTo && navigate(navigateTo);
    } catch (error) {
      const {
        response: { data },
      } = error;
      actions.setFieldError(data.field, data.info);
    }
  };
};

export default useFormSubmit;
