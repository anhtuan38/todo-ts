import React, { useEffect, useState } from 'react';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {
  Grid,
  Button,
  Input,
  Pagination,
  Stack,
  Skeleton,
} from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';

import {
  addTodo,
  editTodo,
  fetchTodos,
  searchTodo,
} from './store/Slice/todoSlice';

import { v4 as uuidv4 } from 'uuid';
import Task from './components/Task';

import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';

export interface ITask {
  inputTodo?: string;
  id: string;
  status?: boolean;
  createAt?: Date;
}

export const App = () => {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { filter, todos, isLoading } = useSelector(
    (state: RootState) => state.todoReducer
  );

  useEffect(() => {
    dispatch(fetchTodos(filter));
  }, []);

  const pageCount = Math.ceil(filter._totalRows / filter._limit) || 0;

  const { register, handleSubmit, resetField } = useForm();

  const onSubmit = (data: any): void => {
    dispatch(
      addTodo({
        id: uuidv4(),
        inputTodo: data.inputTodo,
        status: false,
      })
    );
    resetField('inputTodo');
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(searchTodo({
      filter:  filter,
      inputTodo_like: e.target.value
    }));
  };

  const renderTaskList = () =>
    todos.map((item: ITask) => <Task item={item} key={item.id} />);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ width: 500, margin: '0 auto' }}
    >
      <Grid item>
        <h1>todos</h1>
      </Grid>
      {todos ? (
        <Grid item>
          <Input
            {...register('search')}
            placeholder="Search..."
            onChange={handleSearch}
            sx={{ width: '100%' }}
          />
          {todos.length > 0 ? (
            isLoading ? (
              <Stack spacing={2}>
                <Skeleton variant="rectangular" width={400} height={60} />
                <Skeleton variant="rectangular" width={400} height={60} />
                <Skeleton variant="rectangular" width={400} height={60} />
              </Stack>
            ) : (
              renderTaskList()
            )
          ) : (
            <Grid
              container
              sx={{ width: 400, height: 100 }}
              justifyContent="center"
              alignItems="center"
            >
              No result...
            </Grid>
          )}
          {pageCount > 0 && (
            <Pagination
              count={pageCount}
              color="primary"
              sx={{ float: 'right' }}
              onChange={(_, value) =>
                dispatch(fetchTodos({ ...filter, _page: value }))
              }
            />
          )}
        </Grid>
      ) : (
        <>
          <Grid item>
            <ListAltIcon sx={{ fontSize: 75 }} />
          </Grid>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <h2>Add your first todo</h2>
            <p>What do you want to get done today?</p>
          </Grid>
        </>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register('inputTodo')} placeholder="E.g. Build a web app" />
        <Button type="submit">Submit</Button>
      </form>
    </Grid>
  );
};
