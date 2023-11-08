import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const signUpUser = createAsyncThunk('user/signUp', async (userData) => {
  const response = await fetch('https://654a508ce182221f8d52f4e5.mockapi.io/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error('Failed to sign up');
  }
});

export const signInUser = createAsyncThunk('user/signIn', async (credentials) => {
  const response = await fetch('https://654a508ce182221f8d52f4e5.mockapi.io/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    const users = await response.json();
    const user = users.find((u) => u.email === credentials.email && u.password === credentials.password);

    if (user) {
      return user;
    } else {
      throw new Error('Invalid credentials');
    }
  } else {
    throw new Error('Failed to sign in');
  }
});

export const signOutUser = createAsyncThunk('user/signOut', async () => {
  return null;
});

export const enrollCourse = createAsyncThunk('user/enrollCourse', async (courseName, { getState }) => {
    const { userReducer } = getState();
    const { currentUser } = userReducer;
  
    if (currentUser) {
      const updatedUser = { ...currentUser };
      const updatedCourses = [...updatedUser.course, courseName]; // Appending the new course name
      updatedUser.course = updatedCourses;
  
      const response = await fetch(`https://654a508ce182221f8d52f4e5.mockapi.io/user/${updatedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });
  
      if (response.ok) {
        return updatedUser;
      } else {
        throw new Error('Failed to enroll in the course');
      }
    } else {
      throw new Error('User is not signed in');
    }
});

export const getAllUsers = createAsyncThunk('getAllUsers', async () => {
  const response = await fetch('https://654a508ce182221f8d52f4e5.mockapi.io/user');
  if (response.ok) {
    const allUsers = await response.json();
    return allUsers;
  } else {
    throw new Error('Failed to fetch users');
  }
});


const userSlice = createSlice({
  name: 'user',
  initialState: {
    allUsers: [],
    status: 'idle',
    currentUser: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentUser = action.payload;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(signInUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentUser = action.payload;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.status = 'idle';
        state.currentUser = null;
      })
      .addCase(enrollCourse.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.status = 'succeeded';
      })
      .addCase(enrollCourse.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
         state.allUsers = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });      
  },
});



export default userSlice.reducer;
