import { createSlice } from "@reduxjs/toolkit";
const user_id = window.localStorage.getItem("user_id");

const initialize = {
    pc_conversations: [], //array with a list of conversations, where each conversation is represented by a user object
    pc_current_conversation: null, //current conversation_id
    pc_current_messages: [], //messages in the current chat
};

const slice = createSlice({
  name: "chat",
  initialState: initialize,
  reducers: {
    //update array with pc_conversations
    fetchPersonalConversation(state, action) {
      //understand the working
      const list = action.payload.conversations.map((ele) => {
        const curr_user = ele.participants.find(
          (el) => el._id.toString() !== user_id
        );

        return {
          id: ele._id,
          user_id: curr_user._id,
          name: curr_user.name,
          img: curr_user.imageUrl,
          pinned: false,
          unread: 0,
          time: "10:22",
          status: curr_user.status,
          msg: ele.messages.slice(-1)[0],
        };
      });
      state.pc_conversations = list;
    },
    //updates specific conversation in pc_conversations
    updatePersonalConversation(state,action){
       const curr_conversation=action.payload.message
       state.pc_conversations =state.pc_conversations.map((ele)=>{
        if(ele.id!==curr_conversation._id){
          return ele
        }
        else{
          const user= curr_conversation.participants.find((e)=> e._id.toString()!==user_id)
          return{
            id: curr_conversation?._id,
            user_id: user?._id,
            name: user?.name,
            online: user?.status==="online",
            img: user?.imageUrl,
            pinned: false,
            unread: 0,
            time: "10:00"
          }
        }
       })
    },

    //adds new conversation in pc_conversations
    addPersonalConversation(state,action){
       const curr_conversation=action.payload.conversation
       const user= curr_conversation.participants.find((ele)=> ele._id.toString() !==user._id)
       state.pc_conversations.push({
        id: curr_conversation._id,
        user_id: user._id,
        name: user.name,
        img: user.imageUrl,
        pinned: false,
        unread: 0,
        time: "10:22",
      });
    },

    //sets the current conversation_id in the state
    setCurrentConversation(state,action){
      state.pc_current_conversation=action.payload.curr_conversation;
    },

    // update pc_current_messages array with messages for current conversations
    fetchCurrentConversation(state,action){
      const messages=action.payload.message
      const message_properties= messages.map((ele)=>({
        id: ele._id,
        type: "msg",
        subtype: ele.type,
        message: ele.text,
        incoming: ele.to ===user_id,
        outgoing: ele.from ===user_id
      }))
      state.pc_current_messages=message_properties
    },

    //adds new message to the pc_current_messages
    addPersonalMessage(state,action){
      state.pc_current_messages.push(action.payload.message)
    },

    // getMessagesForRoom(state,action){
    //   state.pc_current_messages
    // }
  },
});
export default slice.reducer;

export const FetchPersonalConversations=({conversations})=>{
    return async(dispatch, getState)=>{
        dispatch(slice.actions.fetchPersonalConversation({conversations}))
    }
}
export const AddPersonalConversations=({conversation})=>{
  return async(dispatch, getState)=>{
    dispatch(slice.actions.addPersonalConversation({conversation}))
  }
}
export const UpdatePersonalConversation=({conversation})=>{
  return async(dispatch, getState)=>{
    dispatch(slice.actions.updatePersonalConversation({conversation}))
  }
}
export const SetCurrentConversation=(curr_conversation)=>{
  return async(dispatch, getState)=>{
    console.log("cuur_conv "+curr_conversation)
    dispatch(slice.actions.setCurrentConversation({curr_conversation}))
  }
}
export const FetchCurrentConversation=({messages})=>{
  return async(dispatch, getState)=>{
    dispatch(slice.actions.fetchCurrentConversation({messages}))
  }
}
export const AddPersonalMessage=(message)=>{
  return async(dispatch, getState)=>{
    dispatch(slice.actions.addPersonalMessage(message))
  }
}

// export const GetMessage=(roomid)=>{
//   return async(dispatch, getState)=>{
//     dispatch(slice.actions.getMessagesForRoom(roomid))
//   }
// }

