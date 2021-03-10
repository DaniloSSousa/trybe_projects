import { PLAYER_ADD } from '../actions';

const initialState = {
  player: {
    gravatarEmail: '',
    name: '',
  },
};

const reducerPlayer = (state = initialState, action) => {
  switch (action.type) {
    case PLAYER_ADD:
      return {
        ...state,
        player: {
          ...state.player,
          gravatarEmail: action.player.email,
          name: action.player.name,
        },
      };
    default:
      return state;
  }
};

export default reducerPlayer;
