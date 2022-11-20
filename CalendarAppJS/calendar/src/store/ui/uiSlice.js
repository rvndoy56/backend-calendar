import { createSlice } from '@reduxjs/toolkit';
//redux
export const uiSlice = createSlice({
    name:'ui',
    initialState:{
        isDateMOdalOpen:true
    },
    reducers:{
        onOpenDateModal : (state) =>{
            state.isDateMOdalOpen = true;
        },
        onCloseDateModal: (state) =>{
            state.isDateMOdalOpen = false;
        }
    }
})

export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;