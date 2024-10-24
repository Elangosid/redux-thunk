import axios from "axios";
import {
  taskCreated,
  taskFetched,
  taskDeleted,
  taskUpdated,
} from "../reducers/TaskReducer";

const Api_url = "http://localhost:8000/task";

export const CreateTask = (task) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(Api_url, task);
      dispatch(taskCreated(res.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const GetTask = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(Api_url);
      dispatch(taskFetched(res.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const DeleteTask = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${Api_url}/${id}`);
      dispatch(taskDeleted(id));
    } catch (error) {
      console.log(error);
    }
  };
};

export const UpdateTask = (task) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`${Api_url}/${task.id}`, task);
      dispatch(taskUpdated(res.data));
    } catch (error) {
      console.log(error);
    }
  };
};
