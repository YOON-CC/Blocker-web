import styled from 'styled-components';

export const Container = styled.div`
    // background : red;
    position : absolute;
    height: 400px;
    width: 800px;
    display : flex;
    justify-content : space-between;

    top : 50%;
    left : 50%;
    transform : translate(-50%, -50%);
`;
export const Container_1 = styled.div`
    background : white;
    height: 100%;
    width: 260px;
    border-radius : 8px;
    box-shadow: 0px 0px 10px 2px rgb(230, 230, 230);
`;

export const Container_2 = styled.div`
    background : white;
    height: 100%;
    width: 260px;
    border-radius : 8px;
    box-shadow: 0px 0px 10px 2px rgb(230, 230, 230);
`;

export const Container_3 = styled.div`
    background : rgb(186, 186, 186);
    height: 300px;
    width: 260px;
    border-radius : 8px;
    box-shadow: 0px 0px 10px 2px rgb(230, 230, 230);
`;
export const Container_1_title = styled.div`
    // background : red;
    height: 70px;
    width: 100%;
    display : flex;
    justify-content : center;
    align-items:center;
    
    font-size : 17px;
    font-weight : bold;
    color : grey;
`;
export const Container_3_title = styled.div`
    // background : red;
    height: 70px;
    width: 100%;
    display : flex;
    justify-content : center;
    align-items:center;
    
    font-size : 17px;
    font-weight : bold;
    color : white;
`;


export const Container_1_board_container = styled.div`
    position : absolute;
    // background : green;
    height: 320px;
    width: 245px;
    margin-left : 10px;
    overflow : auto;

    /* 스크롤바 스타일링 */
    scrollbar-width: thin;
    scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
    
    &::-webkit-scrollbar {
        width: 8px;
    }
    
    &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 4px;
    }
    
    &::-webkit-scrollbar-thumb:hover {
        background-color: rgba(0, 0, 0, 0.4);
    }
    
    &::-webkit-scrollbar-track {
        background: transparent;
    }
`;
export const Container_1_board_container_frame = styled.div`
    position : relative;
    background : #e4e4e4;
    height: 70px;
    width: 220px;
    border-radius : 4px;
    margin-top : 10px;
    margin-left : 8px;
    cursor : pointer;

    &:hover {
        filter: brightness(90%); 
    }

    color : black;
`;
export const Container_1_board_container_frame_title = styled.div`
    
    // background : blue;
    height: 40px;
    width: 100%;
    margin-top : 7px;

    display : flex;
    justify-content : center;
    align-items: center;

    font-weight : bold;
    font-size : 17px;
    color : #ffffff;
`;
export const Container_1_board_container_frame_info = styled.div`
    // background : yellow;
    height: 30px;
    width: 100%;
    display : flex;
    justify-content : space-evenly;
`;
export const Container_1_board_container_frame_info_content = styled.div`
    // background : red;
    height: 30px;
    width: 140px;

    display : flex;
    justify-content : center;
    align-items: center;

    font-size : 12px;
    color : #a9a9a9;
`;
export const Container_1_board_container_frame_info_state1 = styled.div`
    // background : red;
    height: 30px;
    width: 60px;

    display : flex;
    justify-content : center;
    align-items: center;

    font-size : 12px;
    color : red;
    font-weight : bold;
`;
export const Container_1_board_container_frame_info_state2 = styled.div`
    // background : red;
    height: 30px;
    width: 60px;

    display : flex;
    justify-content : center;
    align-items: center;

    font-size : 12px;
    color : green;
    font-weight : bold;
`;
export const Container_1_board_container_frame_info_state3 = styled.div`
    // background : red;
    height: 30px;
    width: 60px;

    display : flex;
    justify-content : center;
    align-items: center;

    font-size : 12px;
    color : grey;
    font-weight : bold;
`;
export const Container_1_img = styled.div`
    // background : red;
    height: 100px;
    width: 230px;
    margin-left : 15px;
`
export const Container_3_btn = styled.button`
    background : white;
    height: 60px;
    width: 230px;
    margin-left : 15px;
    margin-top : 45px;

    border-radius : 5px;
    border : none;

    font-size : 15px;
    font-weight : bold;
    cursor : pointer;
    color : grey;
    &:hover {
        filter: brightness(90%); 
    }
`