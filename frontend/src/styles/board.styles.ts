import styled from 'styled-components';

export const Container = styled.div`
    // background : red;
    height: fit-content;
    width: 100%;
`;
export const Board_title = styled.div`
    position : absolute;
    // background : aqua;

    height: fit-content;
    height : fit-content;
    width: 1260px;
    margin-top : 220px;

    left : 50%;
    transform : translate(-50%);

    font-size : 30px;
    font-weight : bold;
    color : #aeaeae;

    border-bottom : 1px solid #e4e4e4;
    padding-bottom : 15px;
`;
export const Container_board_frame = styled.div`
    position : absolute;
    // background : red;

    height: fit-content;
    height : fit-content;
    width: 1300px;
    margin-top : 240px;

    left : 50%;
    transform : translate(-50%);

    display : flex;
    flex-wrap: wrap;
`;

export const Container_board_item = styled.div`
    // background : red;

    width : 406px;
    height : 330px;
    margin-top :50px;
    margin-left : 20px;
    border-radius : 3px;
`;

export const Container_board_background_img = styled.div`
    background-size: 100% 100%;
    background-repeat: no-repeat;
    // background : green;
    height : 250px;
    border-radius : 5px;

    &:hover {
        filter: brightness(95%); 
        cursor : pointer;
    }

`;
export const Container_board_item_info = styled.div`
    // background : blue;
    position : relative;
    height : 20px;
    width : 396px;
    // background : red;
    display: flex;
    justify-content: flex-end; /* 자식 요소들을 오른쪽 끝으로 정렬 */
    font-size : 14px;
    padding-right : 10px;
    padding-top : 7px;
    color : #ffffff;
    
`;

export const Container_board_profile = styled.div`
    // background : #d1d1d1;
    height : 80px;
    width : 100%;  
`;

export const Container_board_profile_frame = styled.div`
    // background : aqua;
    height : 100%;
    width : 140px;  
`;
export const Container_board_profile_user_info1 = styled.div`
    // background : green;
    width : 100%;
    height : 20px;

    font-size : 15px;
    font-weight : bold;
    color : #435DF1;

    display : flex;
    align-items : center;

    margin-top : 5px;
`;
export const Container_board_profile_user_info2 = styled.div`
    // background : yellow;
    width : 140px;
    height : 20px;

    display : flex;
    justify-content : center;
    align-items : center;

    font-size : 12px;
    color : grey;
    
`;

export const Container_board_profile_user_info3 = styled.div`
    // background : yellow;
    width : 140px;
    height : 20px;

    display : flex;
    justify-content : center;
    align-items : center;

    font-size : 12px;
    color : grey;
    
`;
export const Container_board_title_frame = styled.div`
    // background : blue;
    height : 40px;
    width : 280px;
    
    display : flex;
    align-items:center;
    
    font-size : 30px;
    font-weight:bold;

    color : black;
`;
export const Container_board_content_frame = styled.div`
    // background : yellow;
    height : 20px;
    width : 100%;
    
    display : flex;
    align-items:center;

    color: grey;
    font-size : 13px;
    font-weight:bold;
`;