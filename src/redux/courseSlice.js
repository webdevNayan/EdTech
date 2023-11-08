import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";

// create action 

export const createCourse = createAsyncThunk ("createCourse", async (data, {rejectWithValue}) =>{
    // send data to server and save it in database
    const response = await fetch("https://654a508ce182221f8d52f4e5.mockapi.io/courses",{
        method: "POST",
        headers:{
            'Content-Type': 'application/json',          
        },
        body : JSON.stringify(data)
    }) 

    try {
        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }

});


// read action

export const getAllCourses = createAsyncThunk ('getAllCourses',async (data, {rejectWithValue})=>{

    let response = await fetch("https://654a508ce182221f8d52f4e5.mockapi.io/courses");
        try {
            const result = await response.json();
            return result;
        }
        catch (error) {
            return rejectWithValue(error);
        }

});


//delete action


export const deleteCourse = createAsyncThunk(
    "deleteCourse",
    async (id, { rejectWithValue }) => {
      try {
        const response = await fetch(
          `https://654a508ce182221f8d52f4e5.mockapi.io/courses/${id}`,
          {
            method: "DELETE",
          }
        );
        const result = await response.json();
        return result;
      } catch (err) {
        console.log(err);
        return rejectWithValue(err.response.data);
      }
    }
  );
  

  // get by ID action
export const getCourseById = createAsyncThunk('getCourseById', async (id, { rejectWithValue }) => {
    try {
        const response = await fetch(`https://654a508ce182221f8d52f4e5.mockapi.io/courses/${id}`);
        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
});


// edit action

export const editCourse = createAsyncThunk('editCourse', async ({ id, updatedCourse }, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://654a508ce182221f8d52f4e5.mockapi.io/courses/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCourse),
      });
  
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
});


// Like action
export const likeCourse = createAsyncThunk('courses/likeCourse', async (id, { getState, dispatch, rejectWithValue }) => {
  const { courses } = getState().userReducer;
  const courseToLike = courses.find(course => course.id === id);

  if (courseToLike) {
    if (!courseToLike.likedBy) {
      courseToLike.likedBy = []; // Add an array to keep track of users who liked the course
    }

    // Replace with your actual user ID or some unique identifier
    const userId = 'user123';

    if (!courseToLike.likedBy.includes(userId)) {
      courseToLike.courseLike++; // Increment the 'like' count
      courseToLike.likedBy.push(userId); // Add the user to the likedBy array

      // Update the course data in the API
      try {
        const response = await fetch(`https://654a508ce182221f8d52f4e5.mockapi.io/courses/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(courseToLike),
        });

        const result = await response.json();
        // You can dispatch another action to update the store based on the result if needed
      } catch (error) {
        return rejectWithValue(error);
      }
    } else {
      return rejectWithValue('User has already liked this course');
    }
  } else {
    return rejectWithValue('Course not found');
  }
});

const coourseSlice= createSlice({
    name: "courses",
    initialState: {
        courses: [{
            id:nanoid(),            
            courseName: '',
            instructorName: '',
            description: '',
            enrollmentStatus: '',
            courseDuration: '',
            schedule: '',
            location: '',
            prerequisites: '',
            progress: '',
            syllabus: '',
            thumbnail1: '',
            thumbnail2: '',
            thumbnail3: '',
            courseFees: '',
            courseLike: ''
        }],
        loading: false,
        error: null
    },
 
    extraReducers: (builder) => {
        // Create action
        builder.addCase(createCourse.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(createCourse.fulfilled, (state, action) => {
          state.loading = false;
          state.courses.push(action.payload);
        });
        builder.addCase(createCourse.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        });
    
        // Read action
        builder.addCase(getAllCourses.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(getAllCourses.fulfilled, (state, action) => {
          state.loading = false;
          state.courses = action.payload;
        });
        builder.addCase(getAllCourses.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        });
    
        // Delete action
        builder.addCase(deleteCourse.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(deleteCourse.fulfilled, (state, action) => {
          state.loading = false;
          const { id } = action.payload;
          if (id) {
            state.courses = state.courses.filter((post) => post.id !== id);
          }
        });
        builder.addCase(deleteCourse.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        });
    
        // Get by ID action
        builder.addCase(getCourseById.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(getCourseById.fulfilled, (state, action) => {
          state.loading = false;
          state.singleCourse = action.payload;
        });
        builder.addCase(getCourseById.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        });
    
        // Edit action
        builder.addCase(editCourse.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(editCourse.fulfilled, (state, action) => {
          state.loading = false;
          const updatedCourse = action.payload;
          const index = state.courses.findIndex((store) => store.id === updatedCourse.id);
          if (index !== -1) {
            state.singleCourse[index] = updatedCourse;
          }
        });
        builder.addCase(editCourse.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        });

        // Like 
        
        builder.addCase(likeCourse.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(likeCourse.fulfilled, (state, action) => {
          state.loading = false;
          // Handle the success of the like action if needed
        });
        builder.addCase(likeCourse.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload; // Verify if action.payload contains a 'message' property
        });
        

      },
    });
    
export default coourseSlice.reducer;