import { useReducer } from "react";

const editorsReducer = (state, action) => {
  const { type, updatedEditor } = action;
  switch (type) {
    default: throw new Error(`unknown action type: ${type}`);
    case 'UPDATE':
      return state.map(editor => {
        return editor.key === updatedEditor.key ? { ...updatedEditor } : editor;
      });
  }
}

const useEditorsReducer = initState => {
  const [state, dispatch] = useReducer(editorsReducer, initState);
  return [
    state, 
    {
      update: updatedEditor => dispatch({ type: 'UPDATE', updatedEditor })
    }
  ]  
}

export default useEditorsReducer;