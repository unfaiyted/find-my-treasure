export const UPDATE_PLAYER_DATA = 'UPDATE_PLAYER_DATA';

export const getPlayerData = (data) => {
    const { detail } = data;

    return {
        type: UPDATE_PLAYER_DATA,
        data: detail
    }


}
