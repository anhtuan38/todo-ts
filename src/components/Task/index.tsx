import React, { useState } from 'react';

import {
  List,
  ListItem,
  IconButton,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Typography,
  Grid,
  Input,
} from '@mui/material';

import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { Delete as DeleteIcon } from '@mui/icons-material';

import { theme } from '../../theme';
import { ITask } from '../../App';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { editTodo, removeTodo } from '../../store/Slice/todoSlice';

interface IProps {
  item: ITask;
}

interface IInput {
  edit: string;
}

const Task = ({ item }: IProps) => {
  const [edit, setEdit] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { filter } = useSelector((state: RootState) => state.todoReducer);
  const { register, handleSubmit } = useForm({
    defaultValues: { edit: item.inputTodo },
  });

  const onSubmit = (data: any) => {
    dispatch(
      editTodo({
        id: item.id,
        inputTodo: data.edit,
      })
    );
  };

  const handleRemoveTodo = () => {
    dispatch(removeTodo({ id: item.id }));
  };

  const handleCheck = () => {
    dispatch(editTodo({ id: item.id, status: !item.status }));
  };

  return (
    <List sx={{ width: 400 }} key={item.id}>
      <ListItem
        divider
        secondaryAction={
          edit ? (
            <Grid container spacing={2}>
              <Grid item>
                <IconButton
                  edge="end"
                  aria-label="confirm"
                  type="submit"
                  form="form-edit"
                >
                  <CheckIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  edge="end"
                  aria-label="cancel"
                  onClick={() => setEdit(false)}
                >
                  <CloseIcon color="error" />
                </IconButton>
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={2}>
              <Grid item>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={(e) => {
                    e.preventDefault();
                    setEdit(true);
                  }}
                >
                  <EditIcon color="primary" />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={handleRemoveTodo}
                >
                  <DeleteIcon color="error" />
                </IconButton>
              </Grid>
            </Grid>
          )
        }
      >
        {edit ? (
          <form id="form-edit" onSubmit={handleSubmit(onSubmit)}>
            <Input {...register('edit')} fullWidth />
          </form>
        ) : (
          <FormGroup>
            <FormControlLabel
              control={<Checkbox onClick={handleCheck} checked={item.status} />}
              label={
                <Typography
                  className={item.status ? theme.typography.textDecoration : ''}
                >
                  {item.inputTodo}
                </Typography>
              }
            />
          </FormGroup>
        )}
      </ListItem>
    </List>
  );
};

export default Task;
